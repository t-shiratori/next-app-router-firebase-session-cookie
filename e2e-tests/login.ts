import type { Page } from '@playwright/test'

/** ログインのテスト */
export const login = async (page: Page) => {
	/** ログイン画面に遷移 */
	await page.goto('login')

	/** フォームに入力してログインを実行 */

	await page.locator('input[name="email"]').fill(process.env.LOGIN_ID ?? '')
	await page.locator('input[name="password"]').fill(process.env.LOGIN_PASSWORD ?? '')
	await page.getByRole('button', { name: 'ログイン' }).click()

	/** 認証後のリダイレクトを待機 */
	await page.waitForURL(`/`)
}
