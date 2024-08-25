'use server'

import { clog } from '@/utils/log/node'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function sessionLogout() {
	clog.blue('>>>[sessionLogout]')

	const cookieStore = cookies()
	cookieStore.delete('session')
	redirect('/login')
}
