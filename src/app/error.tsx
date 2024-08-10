'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('error: ', error)
	}, [error])

	return (
		<div className="m-4">
			<h1 className="mb-4">Error</h1>
			<p>{error.message}</p>
		</div>
	)
}
