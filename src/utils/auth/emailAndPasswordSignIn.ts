import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { clientAuth } from './clientSdk'

type emailSignInArgs = {
	email: string
	password: string
	onGetIdToken: (idToken: string) => void
}

/**
 * Firebase authentication. SinIn（email, password）
 */
export const emailAndPasswordSignIn = async ({ email, password, onGetIdToken }: emailSignInArgs) => {
	const userCredential = await signInWithEmailAndPassword(clientAuth, email, password).catch((error) => {
		console.log('signInWithEmailAndPassword error:', error)
		throw new Error(error)
	})

	// Get the user's ID token as it is needed to exchange for a session cookie.
	const idToken = await getIdToken(userCredential.user).catch((error) => {
		console.log('getIdToken error:', error)
		throw new Error(error)
	})

	console.log({ idToken })

	onGetIdToken(idToken)

	console.log('clientAuth.signOut()')

	// A page redirect would suffice as the persistence is set to NONE.
	return clientAuth.signOut()
}
