import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { errorMessage } from '@/utils/errorMessage'
import { clog } from '@/utils/log/node'
import { FirebaseAuthError, getAuth } from 'firebase-admin/auth'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	clog.blue('>>>[custom-claims api]')

	try {
		/**
		 * @see https://firebase.google.com/docs/auth/admin/custom-claims?hl=ja#backend_implementation_admin_sdk
		 */

		const reqBody = await request.json()

		console.log({ reqBody })

		const { idToken, uid, role } = reqBody

		if (role === '') {
			clog.red('Required role parameter missing')
			throw Error('Required role parameter missing')
		}

		// Verify the ID token and decode its payload.
		const claims = await admninSdkAuth.verifyIdToken(idToken).catch((error: FirebaseAuthError) => {
			clog.red(`[verifyIdToken error]`)
			console.log({ error })
			throw error
		})

		console.log({ claims })

		// Verify user is eligible for additional privileges.
		const isValidUser =
			typeof claims.email !== 'undefined' &&
			typeof claims.email_verified !== 'undefined' &&
			claims.email_verified &&
			claims.email.endsWith('@gmail.com')

		console.log({ isValidUser })

		if (!isValidUser) {
			throw Error(`account is ineligible`)
		}

		const reqRole: Record<string, boolean> = {}
		reqRole[role] = true

		// Set admin privilege on the user corresponding to uid.
		// The new custom claims will propagate to the user's ID token the
		// next time a new one is issued.
		await admninSdkAuth.setCustomUserClaims(uid, reqRole).catch((error: FirebaseAuthError) => {
			clog.red(`[setCustomUserClaims error]`)
			console.log({ error })
			throw error
		})

		const user = await admninSdkAuth.getUser(uid).catch((error: FirebaseAuthError) => {
			clog.red(`[getUser error]`)
			console.log({ error })
			throw error
		})

		console.log({ user })

		return Response.json(
			{
				result: {
					user,
				},
			},
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
