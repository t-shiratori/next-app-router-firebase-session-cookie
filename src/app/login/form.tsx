'use client'

import { useState } from 'react'
import { emailSignIn } from '../../utils/auth/clientSdk'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/utils/apiClient'
import { sessionLogin } from '@/utils/actions/sessionLogin'

export const LoginForm = () => {
	const router = useRouter()
	const [emailState, setEmailState] = useState('')
	const [passwordState, setPasswordState] = useState('')

	const handleSubmit = async () => {
		if (emailState == '') return
		if (passwordState == '') return

		const result = await emailSignIn({
			email: emailState,
			password: passwordState,
			handleAfterSignIn: async (idToken) => {
				//router.push('/')

				const result = await sessionLogin(idToken)
				console.log('sessionLogin result: ', result)

				/** For api route execution */
				// const res = await fetcher({ url: 'http://localhost:3000/api/session-login', method: 'GET', idToken })
				// console.log('sessionLogin result: ', res)
			},
		})
		console.log({ result })
		router.push('/')
	}

	return (
		<form
			className="space-3 p-4"
			onSubmit={(e) => {
				e.preventDefault()
			}}>
			<input
				className="border p-2 block"
				id="email"
				type="email"
				name="email"
				placeholder="Enter your email address"
				required
				value={emailState}
				onChange={(e) => {
					setEmailState(e.target.value)
				}}
			/>
			<input
				className="border mt-3 p-2 block"
				id="password"
				type="password"
				name="password"
				placeholder="Enter password"
				required
				value={passwordState}
				minLength={6}
				onChange={(e) => {
					setPasswordState(e.target.value)
				}}
			/>
			<button
				className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="submit"
				onClick={handleSubmit}>
				ログイン
			</button>
		</form>
	)
}
