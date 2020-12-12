import { useIsSpanish } from 'hooks/translate'
import NavLink from './navlink'
import Link from 'next/link'
import cx from 'classnames'

export default function Nav({ toggleMenu, showMenu }) {
  const isSpanish = useIsSpanish()

  return (
    <nav className="flex items-center justify-between sticky border-b border-gray-200 w-full top-0 right-0 left-0 bg-white z-50">
      <Link href="/">
        <a className="mr1 p-4 ">
          <img src="/imgs/logo.svg" alt="FNE International" width="180" />
        </a>
      </Link>

      <div className="relative z-10 p-4 cursor-pointer" onClick={toggleMenu}>
        <div className="ham">
          <div className={cx('ham-1', { ham45: showMenu })} />
          <div className={cx('ham-2', { 'ham-45': showMenu })} />
        </div>
      </div>

      <div
        className={cx('p-4 menu bg-white', { 'menu-mobile-show': showMenu })}
      >
        <NavLink style="ml-4 sm:mb-4" href="/blog">
          Blog
        </NavLink>
        <a
          href="https://donate.fneinternacional.org/"
          className="ml-4 sm:mt-4 px-4 py-1 button-donate"
        >
          {isSpanish ? 'Donar' : 'Donate'}
        </a>
      </div>
    </nav>
  )
}
