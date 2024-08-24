'use client'

import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export default function Layout({ children }: Props) {
	return <div>{children}</div>
	//return <AuthWrapper>{children}</AuthWrapper>
}
