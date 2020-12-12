import { useRouter } from 'next/router'
import { GetStaticPathsContext } from 'next'
import { getAllPagesWithSlug, getPage } from 'lib/api'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import PostTitle from 'components/post-title'
import Head from 'next/head'
import useTranslator from 'hooks/translate'

export default function Post({ page }) {
  const router = useRouter()
  const translate = useTranslator()

  if (!router.isFallback && !page?.content) {
    return <ErrorPage statusCode={404} />
  }

  const title = translate(page, 'title')
  const content = translate(page, 'content')

  return (
    <Layout>
      <Container style="py-24 sm:py-12">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <article>
            <Head>
              <title>hi</title>
            </Head>
            <PostHeader title={title} />
            <PostBody content={content} />
          </article>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPage(params.slug)

  return { props: { page: data.page } }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const allPages = await getAllPagesWithSlug()
  const slugs = allPages.pages.nodes.map(({ slug }) => `/${slug}`) || []
  const paths = locales.flatMap((locale) =>
    slugs.map((slug) => ({ params: { slug }, locale }))
  )

  return { paths, fallback: true }
}
