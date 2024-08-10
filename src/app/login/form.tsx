'use client'

import { useState } from 'react'
import { emailSignIn } from '../../utils'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
	const router = useRouter()
	const [emailState, setEmailState] = useState('')
	const [passwordState, setPasswordState] = useState('')

	const handleSubmit = async () => {
		if (emailState == '') return
		if (passwordState == '') return

		const result = await emailSignIn(emailState, passwordState)
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
