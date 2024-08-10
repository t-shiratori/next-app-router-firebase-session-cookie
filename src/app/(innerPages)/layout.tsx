'use client'

import { AuthWrapper } from '@/components/AuthWrapper'
import { authToken } from '@/globalState'
import { auth, getCurrentUser } from '@/utils'
import { signOut } from 'firebase/auth'
import { useAtomValue } from 'jotai'
import { Content } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export default function Layout({ children }: Props) {
	return <AuthWrapper>{children}</AuthWrapper>
}
