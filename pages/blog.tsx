import { getAllPostsForHome } from 'lib/api'
import { sanitizeWPContent } from 'lib/utils'
import Head from 'next/head'
import Container from 'components/container'
import Layout from 'components/layout'
import Date from 'components/date'
import CoverImage from 'components/cover-image'
import Link from 'next/link'
import MoreStories from 'components/more-stories'

export default function Index({ allPosts, preview }) {
  const edges = allPosts?.edges ?? []
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <Layout preview={preview}>
      <Head>
        <title>Blog</title>
      </Head>
      <Container>
        {/** Hero */}
        <section className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 items-center mb-20 md:mb-28">
          <Link as={`/posts/${heroPost.slug}`} href="/posts/[slug]">
            <div className="cursor-pointer">
              <h3 className="mb-4 text-4xl lg:text-6xl leading-tight my-8">
                <a
                  className="hover:underline"
                  dangerouslySetInnerHTML={{ __html: heroPost.title }}
                />
              </h3>
              <div className="mb-4 md:mb-0 text-lg">
                <Date dateString={heroPost.date} />
              </div>
              <div
                className="text-lg leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: sanitizeWPContent(heroPost.excerpt),
                }}
              />

              <button className="button my-4">Read more</button>
            </div>
          </Link>
          {heroPost.featuredImage.node && (
            <div className="mb-8 md:mb-16">
              <CoverImage
                title={heroPost.title}
                coverImage={heroPost.featuredImage.node}
                slug={heroPost.slug}
              />
            </div>
          )}
        </section>

        <MoreStories posts={morePosts} />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
  }
}
