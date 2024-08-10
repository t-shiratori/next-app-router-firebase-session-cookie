import Link from 'next/link'

export const GolbalNav = () => {
	return (
		<nav className="m-3">
			<li>
				<Link href={'/'}>home</Link>
			</li>
			<li>
				<Link href={'dashboard'}>dashboard</Link>
			</li>
			<li>
				<Link href={'userInfo'}>user info</Link>
			</li>
		</nav>
	)
}
