'use client'

import { authToken } from '@/globalState'
import { auth } from '@/utils'
import { useAtom, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { GolbalNav } from './GolbalNav'
import { Logout } from './Logout'
import { useResetAtom } from 'jotai/utils'

type Props = {
	children: ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)
	const [authTokenState, setAuthTokenState] = useAtom(authToken)
	const resetAuthToken = useResetAtom(authToken)

	useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged(
			async (user) => {
				/** Sign In */
				console.log('onAuthStateChanged: ', user)
				if (!user) {
					router.push('/login')
					resetAuthToken()
					setIsLoading(false)
					return
				}
				const token = await user.getIdToken()
				console.log({ token })
				setAuthTokenState(token)
				setIsLoading(false)
			},
			(error) => {
				console.log(error)
				setIsLoading(false)
			},
		)
		return () => {
			unsubscribed()
		}
	}, [resetAuthToken, router, setAuthTokenState])

	if (isLoading) return <p className="m-6">... checking authentication status</p>

	if (authTokenState)
		return (
			<>
				<Logout />
				<GolbalNav />
				<div className="m-6">{children}</div>
			</>
		)
}
