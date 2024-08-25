type TArgs = {
	path: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	body?: object
	headerObject?: Record<string, string>
	credentials?: RequestCredentials
}

export const fetcher = async ({ path, method, body, headerObject, credentials }: TArgs) => {
	const headers = new Headers(headerObject)
	headers.append('Content-Type', 'application/json')

	const url = `http://localhost:3000${path}`

	try {
		const response = await fetch(url, {
			headers,
			method,
			body: JSON.stringify(body),
			credentials,
		})

		if (!response.ok) {
			throw new Error(response.statusText)
		}

		return await response.json()
	} catch (error) {
		console.log('error: ', error)
		return Promise.reject(error)
	}
}
