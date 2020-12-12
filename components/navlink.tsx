import { useRouter } from 'next/router'
import cx from 'classnames'
import Link from 'next/link'

interface Props {
  href: string
  style?: string
  children?: React.ReactNode
}

const NavLink = ({ href, style, children }: Props) => {
  const router = useRouter()
  const disabled: boolean = router?.pathname === href

  return (
    <span className={cx(style, { disabled })}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </span>
  )
}

export default NavLink
