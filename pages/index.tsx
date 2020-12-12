import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>Hi</title>
        </Head>

        <Container>hi </Container>
      </Layout>
    </>
  )
}
