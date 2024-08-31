import { signInWithEmailAndPassword, getIdToken, getIdTokenResult } from 'firebase/auth'
import { clientAuth } from './clientSdk'
import { FirebaseError } from 'firebase/app'

type emailSignInArgs = {
	email: string
	password: string
}

/**
 * Firebase authentication. SinIn（email, password）
 */
export const emailAndPasswordSignIn = async ({ email, password }: emailSignInArgs) => {
	const userCredential = await signInWithEmailAndPassword(clientAuth, email, password).catch((error: FirebaseError) => {
		console.log('signInWithEmailAndPassword error:', error)
		throw error
	})

	console.log({ userCredential })

	const claims = await getIdTokenResult(userCredential.user).catch((error: FirebaseError) => {
		console.log('getIdTokenResult error:', error)
		throw error
	})

	console.log('claims', claims)

	// Get the user's ID token as it is needed to exchange for a session cookie.
	const idToken = await getIdToken(userCredential.user).catch((error: FirebaseError) => {
		console.log('getIdToken error:', error)
		throw error
	})

	console.log({ idToken })

	// A page redirect would suffice as the persistence is set to NONE.

	clientAuth.signOut()

	return idToken
}
