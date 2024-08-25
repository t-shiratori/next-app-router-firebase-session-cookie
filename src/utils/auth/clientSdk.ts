import { initializeApp, getApps } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const alreadyCreatedApps = getApps()

console.log({ alreadyCreatedApps })

const clientSdkApp = (() => {
	// すでにアプリが初期化済みならそれを返す
	if (alreadyCreatedApps.length > 0) {
		return alreadyCreatedApps[0]
	}
	return initializeApp(firebaseConfig)
})()

export const clientAuth = getAuth(clientSdkApp)

console.log('clientSdk app:', { clientSdkApp })

// As httpOnly cookies are to be used, do not persist any state client side.
;(async () => {
	return await setPersistence(clientAuth, browserLocalPersistence)
})()
