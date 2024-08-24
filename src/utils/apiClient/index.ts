type TArgs = {
	url: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	body?: object
	idToken?: string
}

export const fetcher = async ({ url, method, body, idToken }: TArgs) => {
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	idToken && headers.append('idToken', idToken)

	try {
		//throw new Error('TestError')

		const response = await fetch(url, {
			headers,
			method,
			body: JSON.stringify(body),
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
