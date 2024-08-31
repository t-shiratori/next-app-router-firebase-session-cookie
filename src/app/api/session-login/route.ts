import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { errorMessage } from '@/utils/errorMessage'
import { clog } from '@/utils/log/node'
import { FirebaseAuthError } from 'firebase-admin/auth'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	clog.blue('>>>[session-login api]')

	try {
		const cookieStore = cookies()

		const idToken = request.headers.get('idToken') ?? false

		if (!idToken) {
			throw Error('Not found id token !')
		}

		/** Check id token is valid */
		const verifiedIdToken = await admninSdkAuth.verifyIdToken(idToken).catch((error: FirebaseAuthError) => {
			clog.red('[verifyIdToken error]')
			console.log({ error })
			throw error
		})

		console.log({ verifiedIdToken })

		// // Set session expiration to 5 days.
		// const expiresIn = 60 * 60 * 24 * 5 * 1000

		// 5 minutes
		const expiresIn = 60 * 1000 * 5

		// Create the session cookie. This will also verify the ID token in the process.
		// The session cookie will have the same claims as the ID token.
		// To only allow session cookie setting on recent sign-in, auth_time in ID token
		// can be checked to ensure user was recently signed in before creating a session cookie.
		const sessionCookie = await admninSdkAuth
			.createSessionCookie(idToken, { expiresIn })
			.catch((error: FirebaseAuthError) => {
				clog.red('[createSessionCookie error]')
				console.log({ error })
				throw error
			})

		console.log({ sessionCookie })

		// Set cookie policy for session cookie.
		const options = { maxAge: expiresIn, httpOnly: true, secure: true }
		// res.cookie('session', sessionCookie, options)
		// res.end(JSON.stringify({ status: 'success' }))
		cookieStore.set('session', sessionCookie, options)

		return Response.json(
			{ sessionCookie },
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
