import { NextResponse, type NextRequest } from 'next/server'
import { fetcher } from './utils/apiClient'
import { clog } from './utils/log/node'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	clog.blue('>>>[middleware]')
	console.log('request.nextUrl', request.nextUrl)

	// ログイン画面の場合はスキップ
	if (request.nextUrl.pathname.startsWith('/login')) {
		return NextResponse.next()
	}

	// セッションログイン作成のエンドポイントはスキップ
	if (request.nextUrl.pathname.startsWith('/api/session-login')) {
		return NextResponse.next()
	}

	const sessionCookie = request.cookies.get('session')?.value

	console.log({ sessionCookie })

	// セッションクッキーを使って認証済みかどうかチェックする
	const isAuthenticated = await (async () => {
		if (!sessionCookie) {
			clog.red('There is no session in the cookie.')
			return false
		}
		// Verify the session
		return await fetcher({
			path: '/api/session-verify',
			method: 'POST',
			headerObject: { Cookie: `session=${sessionCookie}` },
			credentials: 'include',
		}).catch((error) => {
			clog.red(`Session verify error: , ${error}`)
			return false
		})
	})()

	console.log({ isAuthenticated })

	// If the user is authenticated, continue as normal
	if (isAuthenticated) {
		return NextResponse.next()
	}

	// Redirect to login page if not authenticated
	return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
	// matcher: {
	// 	source: '/',
	// 	regexp: '^(.*)',
	// 	//locale: false,
	// 	// has: [
	// 	// 	{ type: 'header', key: 'Authorization', value: 'Bearer Token' },
	// 	// 	{ type: 'query', key: 'userId', value: '123' },
	// 	// ],
	// 	missing: [{ type: 'cookie', key: 'session', value: 'active' }],
	// },
	matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
