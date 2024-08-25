import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { clog } from '@/utils/log/node'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	clog.blue('>>>[session-login api]')

	try {
		const cookieStore = cookies()

		const idToken = request.headers.get('idToken') ?? false

		if (!idToken) {
			throw new Error('Not found id token !')
		}

		/** Check id token is valid */
		const verifiedIdToken = await admninSdkAuth.verifyIdToken(idToken).catch((error) => {
			clog.red(error)
			throw new Error('Invalid id token !')
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
		const sessionCookie = await admninSdkAuth.createSessionCookie(idToken, { expiresIn }).catch((error) => {
			clog.red(error)
			throw new Error('Could not get session cookie.')
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
		clog.red(error as string)

		const errorMessage = typeof error === 'string' ? error : 'Fail to get session cookie.'

		return Response.json(
			{
				message: errorMessage,
			},
			{
				status: 401,
			},
		)
	}
}
