import { useRouter } from 'next/router'
import { GetStaticPathsContext } from 'next'
import { getAllPostsWithSlug, getPostAndMorePosts } from 'lib/api'
import { sanitizeWPContent } from 'lib/utils'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import SectionSeparator from 'components/section-separator'
import Layout from 'components/layout'
import PostTitle from 'components/post-title'
import MoreStories from 'components/more-stories'
import Head from 'next/head'
import Tags from 'components/tags'
import useTranslator from 'hooks/translate'

export default function Post({ post, posts, preview }) {
  const router = useRouter()
  const translate = useTranslator()

  const morePosts = posts?.edges

  const title = translate(post, 'title')
  const content = translate(post, 'content')

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container style="py-24 sm:py-12">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{title} | FNE International</title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.sourceUrl}
                />
              </Head>
              <PostHeader
                title={title}
                coverImage={post.featuredImage}
                date={post.date}
                // author={post.author}
                // categories={post.categories}
              />
              <PostBody content={content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            <MoreStories posts={morePosts} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostAndMorePosts(params.slug, preview, previewData)

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const allPosts = await getAllPostsWithSlug()

  const slugs = allPosts.posts.edges.map(({ node }) => `/posts/${node.slug}`)
  const paths = locales.flatMap((locale) =>
    slugs.map((slug) => ({ params: { slug }, locale }))
  )

  return { paths, fallback: true }
}
