import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
	return (
		<div>
			<div>
				<button>ログアウト</button>
			</div>

			<div>{children}</div>
		</div>
	)
}
