'use server'

import { clog } from '@/utils/log/node'
import { getAuth } from 'firebase-admin/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function sessionLogout() {
	clog.blue('>>>[sessionLogout]')

	const cookieStore = cookies()

	const sessionCookie = cookieStore.get('session')?.value

	if (!sessionCookie) {
		redirect('/login')
	}

	cookieStore.delete('session')

	const decodedClaims = await getAuth()
		.verifySessionCookie(sessionCookie)
		.catch((error) => {
			clog.red(error)
		})

	if (!decodedClaims) {
		redirect('/login')
	}

	await getAuth()
		.revokeRefreshTokens(decodedClaims.sub)
		.catch((error) => {
			clog.red(error)
		})

	redirect('/login')

	// .then((decodedClaims) => {
	// 	return getAuth().revokeRefreshTokens(decodedClaims.sub)
	// })
	// .then(() => {
	// 	redirect('/login')
	// })
	// .catch((error) => {
	// 	redirect('/login')
	// })
}
