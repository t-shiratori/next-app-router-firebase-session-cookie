'use server'

import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { cookies } from 'next/headers'

export async function sessionLogin(idToken: string) {
	console.log('idToken: ', { idToken })

	const cookieStore = cookies()
	console.log({ cookieStore })
	console.log('cookieStore.size:', cookieStore.size)
	cookieStore.getAll().map((cookie) => console.log({ cookie }))

	try {
		/** Check id token is valid */
		const verifiedIdToken = await admninSdkAuth.verifyIdToken(idToken).catch((error) => {
			console.log({ error })
			throw new Error('Invalid id token.')
		})

		console.log({ verifiedIdToken })

		// Set session expiration to 5 days.
		const expiresIn = 60 * 60 * 24 * 5 * 1000
		// Create the session cookie. This will also verify the ID token in the process.
		// The session cookie will have the same claims as the ID token.
		// To only allow session cookie setting on recent sign-in, auth_time in ID token
		// can be checked to ensure user was recently signed in before creating a session cookie.
		const sessionCookie = await admninSdkAuth.createSessionCookie(idToken, { expiresIn }).catch((error) => {
			console.log({ error })
			throw new Error('Could not get session cookie.')
		})

		// Set cookie policy for session cookie.
		const options = { maxAge: expiresIn, httpOnly: true, secure: true }
		// res.cookie('session', sessionCookie, options)
		// res.end(JSON.stringify({ status: 'success' }))
		cookieStore.set('session', sessionCookie, options)

		console.log({ sessionCookie })
	} catch (error) {
		if (typeof error === 'string') {
			console.log({ error })
			throw Error(error)
		}
	}
}
