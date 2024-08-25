'use client'

import { useRouter } from 'next/navigation'
import { sessionLogin } from '@/serverActions/sessionLogin'
import { emailAndPasswordSignIn } from '@/utils/auth/emailAndPasswordSignIn'
import { useFormState, useFormStatus } from 'react-dom'
//import { fetcher } from '@/utils/apiClient'

type FormActionState = {
	isSuccess?: boolean
	isFail?: boolean
}

export const LoginForm = () => {
	const router = useRouter()

	const initialState: FormActionState = {
		isSuccess: undefined,
		isFail: undefined,
	}

	const handleSubmit = async (_prevState: FormActionState, formData: FormData) => {
		const emailValue = formData.get('email')?.toString() ?? ''
		const passwordValue = formData.get('password')?.toString() ?? ''

		/** Firebaseでログイン認証を実行 */
		const idToken = await emailAndPasswordSignIn({
			email: emailValue,
			password: passwordValue,
		}).catch((error) => {
			console.log('emailAndPasswordSignIn: ', { error })
		})

		if (!idToken) {
			return {
				isFail: true,
			}
		}

		/** セッション管理の処理 */

		/** サーバーアクションでセッションログインする場合 */
		await sessionLogin({
			idToken,
			redirectPath: '/dashboard',
		}).catch((error) => {
			console.log('sessionLogin: ', { error })

			return {
				isFail: true,
			}
		})
		/** APIルートでセッションログインする場合 */
		// await fetcher({
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

		return {
			isSuccess: true,
		}
	}

	const [actionState, formAction] = useFormState(handleSubmit, initialState)

	console.log({ actionState })

	return (
		<div>
			{actionState.isFail && <div className="space-3 p-4">認証に失敗しました</div>}
			<form className="space-3 p-4" action={formAction}>
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
				<SubmitButton />
			</form>
		</div>
	)
}

const SubmitButton = () => {
	const status = useFormStatus()
	return (
		<button
			disabled={status.pending}
			className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-40"
			type="submit">
			ログイン
		</button>
	)
}
