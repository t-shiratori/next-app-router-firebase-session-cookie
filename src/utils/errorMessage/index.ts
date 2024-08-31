import { FirebaseAuthError } from 'firebase-admin/auth'

export const errorMessage = (error: unknown) => {
	if (error instanceof FirebaseAuthError) {
		return error.toJSON()
	}
	if (error instanceof Error) {
		return error.message
	}
}
