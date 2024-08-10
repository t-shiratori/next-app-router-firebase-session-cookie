'use client'

import { auth } from '@/utils'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export const Logout = () => {
	const router = useRouter()

	const handleSignout = () => {
		signOut(auth)
	}

	return (
		<div className="m-4">
			<button
				className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
				onClick={handleSignout}>
				ログアウト
			</button>
		</div>
	)
}
