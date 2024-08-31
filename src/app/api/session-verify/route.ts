import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { errorMessage } from '@/utils/errorMessage'
import { clog } from '@/utils/log/node'
import { FirebaseAuthError } from 'firebase-admin/auth'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	clog.blue('>>>[session-verify api]')

	try {
		const sessionCookie = request.cookies.get('session')?.value

		if (!sessionCookie) {
			throw new Error('Set the session in the cookie !')
		}

		// Check session
		const decodedClaims = await admninSdkAuth
			.verifySessionCookie(sessionCookie, true /** checkRevoked */)
			.catch((error: FirebaseAuthError) => {
				clog.red(`[verifySessionCookie error]`)
				console.log({ error })
				throw error
			})

		console.log({ decodedClaims })

		// Get user info
		const user = await admninSdkAuth.getUser(decodedClaims.uid).catch((error: FirebaseAuthError) => {
			clog.red(`[getUser error]`)
			console.log({ error })
			throw error
		})

		/**
		 * 権限によって何か操作をしたい場合はカスタムクレイムを使う。
		 * カスタムクレイムを使うには、アカウントに事前にカスタムクレイムを登録しておく必要がある。
		 *
		 * @see https://firebase.google.com/docs/auth/admin/custom-claims?hl=ja#backend_implementation_admin_sdk
		 *
		 * @example
		 * if (customClaims.admin) {
		 *   //
		 * }
		 */
		const { customClaims } = user
		console.log({ customClaims })

		return Response.json(
			{ data: { decodedClaims } },
			{
				status: 200,
			},
		)
	} catch (error) {
		return Response.json(errorMessage(error), {
			status: 401,
		})
	}
}
