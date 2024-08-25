import { admninSdkAuth } from '@/utils/auth/adminSdk'
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

		const decodedClaims = await admninSdkAuth
			.verifySessionCookie(sessionCookie, true /** checkRevoked */)
			.catch((error: FirebaseAuthError) => {
				clog.red(`[verifySessionCookie error]`)
				console.log({ error })
				throw error
			})

		console.log({ decodedClaims })

		return Response.json(
			{ data: { decodedClaims } },
			{
				status: 200,
			},
		)
	} catch (error) {
		return Response.json(
			{
				message: error,
			},
			{
				status: 401,
			},
		)
	}
}
