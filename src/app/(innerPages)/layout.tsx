import { GolbalNav } from '@/components/GolbalNav'
import { Logout } from '@/components/Logout'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export default function Layout({ children }: Props) {
	return (
		<div>
			<Logout />
			<GolbalNav />
			<div className="m-6">{children}</div>
		</div>
	)
}
