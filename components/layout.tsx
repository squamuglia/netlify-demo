import Footer from 'components/footer'
import Meta from 'components/meta'

interface Props {
  preview?: boolean
  children: React.ReactNode
}

export default function Layout({ preview = false, children }: Props) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
