'use server'

import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { clog } from '@/utils/log/node'
import { cookies } from 'next/headers'

export async function sessionLogout(idToken: string) {
	clog.blue('>>>[sessionLogout]')
	console.log('idToken: ', { idToken })

	const cookieStore = cookies()
	console.log({ cookieStore })
	console.log('cookieStore.size:', cookieStore.size)
	cookieStore.getAll().map((cookie) => console.log({ cookie }))

	try {
		/** Check id token is valid */
		const verifiedIdToken = await admninSdkAuth.verifyIdToken(idToken).catch((error) => {
			clog.red(error as string)
			throw new Error('Invalid id token.')
		})

		console.log({ verifiedIdToken })
	} catch (error) {
		if (typeof error === 'string') {
			clog.red(error as string)
			throw Error(error)
		}
	}
}
