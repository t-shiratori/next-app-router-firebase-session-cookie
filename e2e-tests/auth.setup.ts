import { test as setup } from '@playwright/test'
import { AUTH_JSON_FILE, INDEX_DB_NAME, OBJECT_STORE_NAME } from './const'
import { login } from './login'

/**
 * Firebaseのログイン実行と認証情報をlocalStorageとファイルに保存する
 */
setup('Firebase Authentication', async ({ page }) => {
	/** ログイン処理を実行する */
	await login(page)

	/** インデックスDBの内容をローカルストレージにコピーする */
	await page.evaluate(
		async ([indexDBName, indexDBObjectStore]) => {
			const saveIndexDBtoStorage = () => {
				return new Promise<boolean>((resolve, reject) => {
					const indexDB = window.indexedDB
					const openRequest = indexDB.open(indexDBName)

					openRequest.onsuccess = () => {
						const db = openRequest.result
						const transaction = db.transaction([indexDBObjectStore], 'readonly')
						const objectStore = transaction.objectStore(indexDBObjectStore)

						const getAllKeysRequest = objectStore.getAllKeys()
						const getAllValuesRequest = objectStore.getAll()

						getAllKeysRequest.onsuccess = () => {
							const keys = getAllKeysRequest.result

							getAllValuesRequest.onsuccess = () => {
								const values = getAllValuesRequest.result
								for (let i = 0; i < keys.length; i++) {
									const key = keys[i]
									const value = values[i]
									localStorage.setItem(String(key), JSON.stringify(value))
								}
								resolve(true)
							}
						}
					}

					openRequest.onerror = () => {
						console.error('Error opening IndexedDB database:', openRequest.error)
						reject()
					}
				})
			}

			await saveIndexDBtoStorage()
		},
		[INDEX_DB_NAME, OBJECT_STORE_NAME],
	)

	/** ローカルストレージに保存した内容をファイルに保存 */
	await page.context().storageState({ path: AUTH_JSON_FILE })
})
