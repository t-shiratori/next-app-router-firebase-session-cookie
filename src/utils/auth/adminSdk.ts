import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const adminSdkApp = initializeApp({
	credential: applicationDefault(),
})

console.log({ adminSdkApp })

export const admninSdkAuth = getAuth(adminSdkApp)

console.log({ admninSdkAuth })
