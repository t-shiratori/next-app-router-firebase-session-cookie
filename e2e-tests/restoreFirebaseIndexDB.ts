import * as fs from 'fs'
import type { Page } from '@playwright/test'
import { AUTH_JSON_FILE, INDEX_DB_NAME, LOGIN_PATH, OBJECT_STORE_NAME } from './const'

/** Firebase認証情報をファイルからインデックスDBに復元する */
export const restoreFirebaseIndexedDB = async (page: Page) => {
	/** e2e-tests/auth.setup.ts で保存しておいたファイルを読み込む */
	const authJson = JSON.parse(fs.readFileSync(AUTH_JSON_FILE, 'utf8'))

	/**
	 * ログイン画面に遷移
	 *
	 * @note 先にブラウザを起動しないと後続の処理でIDBDatabaseが参照できない
	 */
	await page.goto(LOGIN_PATH)

	/**
	 * jsonファイルから取得したデータをインデックスDBにセットする
	 *
	 * @note evaluate ではなく addInitScript を使うことでナビゲート後すぐに（全てのスクリプトの実行前に）実行できるので、画面のレンダリングを待たない分高速になる
	 */
	await page.addInitScript(
		([indexDBName, indexDBObjectStore, authJson]) => {
			const indexedDB = window.indexedDB
			const openRequest = indexedDB.open(indexDBName)
			openRequest.onsuccess = () => {
				const db = openRequest.result
				const transaction = db.transaction([indexDBObjectStore], 'readwrite')
				const objectStore = transaction.objectStore(indexDBObjectStore)

				const localStorage = authJson.origins[0].localStorage
				for (const element of localStorage) {
					const value = element.value
					objectStore.put(JSON.parse(value))
				}
			}
			openRequest.onerror = (error) => {
				console.log('Restore Firebase IndexDB Error: ', error)
			}
		},
		[INDEX_DB_NAME, OBJECT_STORE_NAME, authJson],
	)
}
