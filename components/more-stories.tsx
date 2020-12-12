import { sanitizeWPContent } from 'lib/utils'
import { GetAllPostsQuery } from 'generated/graphql'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import useTranslator from 'hooks/translate'

type MoreStoriesProps = {
  posts: GetAllPostsQuery['posts']['edges']
}

export default function MoreStories({ posts = [] }: MoreStoriesProps) {
  const translate = useTranslator()

  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 gap-y-8 mb-32">
        {posts.map(({ node }, i) => {
          const { title, featuredImage, date, excerpt, slug } = node
          return (
            <Link as={`/posts/${slug}`} href="/posts/[slug]" key={i}>
              <a className="relative border p-4 rounded-lg cursor-pointer transform hover:-translate-y-0.5 hover:shadow transition-all">
                {!!featuredImage?.node && (
                  <div className="mb-5">
                    <CoverImage
                      title={title}
                      coverImage={featuredImage.node}
                      slug={slug}
                    />
                  </div>
                )}
                <h3 className="text-3xl leading-snug">
                  <div
                    className="hover:underline"
                    dangerouslySetInnerHTML={{
                      __html: translate(node, 'title'),
                    }}
                  />
                </h3>

                <div className="mb-4">
                  <Date dateString={date} />
                </div>
                <div
                  className="text-lg leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeWPContent(excerpt),
                  }}
                />

                <span className="underline">Read more</span>
              </a>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
