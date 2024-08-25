import { admninSdkAuth } from '@/utils/auth/adminSdk'
import { clog } from '@/utils/log/node'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	clog.blue('>>>[session-verify api]')

	try {
		const sessionCookie = request.cookies.get('session')?.value

		if (!sessionCookie) {
			throw new Error('Set the session in the cookie !')
		}

		const decodedClaims = await admninSdkAuth
			.verifySessionCookie(sessionCookie, true /** checkRevoked */)
			.catch((error) => {
				clog.red(error)
				throw new Error('Invalid sessionCookie !')
			})

		console.log({ decodedClaims })

		return Response.json(
			{ data: { decodedClaims } },
			{
				status: 200,
			},
		)
	} catch (error) {
		clog.red(error as string)

		const errorMessage = typeof error === 'string' ? error : 'Fail to get session cookie.'

		return Response.json(
			{
				message: errorMessage,
			},
			{
				status: 401,
			},
		)
	}
}
