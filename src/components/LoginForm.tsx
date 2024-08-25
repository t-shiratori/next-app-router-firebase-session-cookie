'use client'

import { useRouter } from 'next/navigation'
import { sessionLogin } from '@/serverActions/sessionLogin'
import { emailAndPasswordSignIn } from '@/utils/auth/emailAndPasswordSignIn'

export const LoginForm = () => {
	const router = useRouter()

	const handleSubmit = (formData: FormData) => {
		const emailValue = formData.get('email')?.toString() ?? ''
		const passwordValue = formData.get('password')?.toString() ?? ''

		emailAndPasswordSignIn({
			email: emailValue,
			password: passwordValue,
			onGetIdToken: (idToken) => {
				/** サーバーアクションでセッションログインする場合 */
				sessionLogin({
					idToken,
					redirectPath: '/dashboard',
				}).catch((error) => {
					console.log('sessionLogin: ', { error })
				})
				/** APIルートでセッションログインする場合 */
				// fetcher({
				// 	path: '/api/session-login',
				// 	method: 'POST',
				// 	headerObject: { idToken },
				// })
				// 	.then(() => {
				// 		router.push('/dashboard')
				// 	})
				// 	.catch((error) => {
				// 		console.error(error)
				// 	})
			},
		}).catch((error) => {
			console.log('emailAndPasswordSignIn: ', { error })
		})
	}

	return (
		<form className="space-3 p-4" action={handleSubmit}>
			<input
				className="border p-2 block w-[240px]"
				id="email"
				type="email"
				name="email"
				placeholder="Enter your email address"
				required
			/>
			<input
				className="border mt-3 p-2 block w-[240px]"
				id="password"
				type="password"
				name="password"
				placeholder="Enter password"
				required
				minLength={6}
			/>
			<button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
				ログイン
			</button>
		</form>
	)
}
