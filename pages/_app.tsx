import { useState } from 'react'
import { PageTransition } from 'next-page-transitions'
import { useRouter } from 'next/router'
import Nav from '../components/nav'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <Nav toggleMenu={toggleMenu} showMenu={showMenu} />
      <PageTransition timeout={200} classNames="page-transition">
        {!showMenu && <Component {...pageProps} key={router.pathname} />}
      </PageTransition>
    </>
  )
}

export default MyApp
