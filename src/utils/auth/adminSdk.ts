import { applicationDefault, initializeApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const alreadyCreatedApps = getApps()

console.log({ alreadyCreatedApps })

const adminSdkApp = (() => {
	// すでにアプリが初期化済みならそれを返す
	if (alreadyCreatedApps.length > 0) {
		return alreadyCreatedApps[0]
	}
	return initializeApp({
		credential: applicationDefault(),
	})
})()
console.log({ adminSdkApp })

export const admninSdkAuth = getAuth(adminSdkApp)

console.log({ admninSdkAuth })
