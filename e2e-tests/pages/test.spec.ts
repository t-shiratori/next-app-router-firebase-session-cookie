import { test, expect } from '@playwright/test'
import { restoreFirebaseIndexedDB } from '../restoreFirebaseIndexDB'

test.describe('未ログインの場合の挙動', () => {
	test('未ログイン済みの場合、userInfoページにアクセスしようとするとログイン画面にリダイレクトする', async ({
		page,
	}) => {
		await page.goto('/userInfo')
		await page.waitForURL('/login')
		await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible()
	})
})

test.describe('ログイン済みの場合の挙動', () => {
	test.beforeEach(async ({ page }) => {
		/** 認証状態を復元 */
		await restoreFirebaseIndexedDB(page)
	})

	test('ログイン済みの場合、userInfoページを表示できる', async ({ page }) => {
		await page.goto('/userInfo')
		await expect(page.getByRole('heading', { name: 'マイページ' })).toBeVisible()
	})
})
