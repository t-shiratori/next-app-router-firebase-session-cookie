import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, getIdToken } from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

console.log('clientSdk app:', { app })

// As httpOnly cookies are to be used, do not persist any state client side.
;(async () => {
	return await setPersistence(auth, browserLocalPersistence)
})()

type emailSignInArgs = {
	email: string
	password: string
	handleAfterSignIn: (idToken: string) => void
}

export const emailSignIn = async ({ email, password, handleAfterSignIn }: emailSignInArgs) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
			console.log(error)
			throw new Error(error)
		})

		console.log('userCredential?.user: ', userCredential?.user)

		// Get the user's ID token as it is needed to exchange for a session cookie.
		const idToken = await getIdToken(userCredential.user).catch((error) => {
			console.log(error)
			throw new Error(error)
		})
		console.log({ idToken })

		handleAfterSignIn(idToken)

		console.log('auth.signOut()')
		// A page redirect would suffice as the persistence is set to NONE.
		return auth.signOut()
	} catch (error) {
		console.log('emailSignIn error: ', error)
	}
}

export const getCurrentUser = () => {
	return auth.currentUser
}
