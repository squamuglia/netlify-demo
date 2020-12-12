import cx from 'classnames'
import Link from 'next/link'
import { GetAllPostsQuery } from 'generated/graphql'

export type FeaturedImage = GetAllPostsQuery['posts']['edges'][0]['node']['featuredImage']['node']

interface CoverImageProps {
  title: string
  coverImage: FeaturedImage
  slug?: string
}

export default function CoverImage({
  title,
  coverImage,
  slug,
}: CoverImageProps) {
  const image = <img src={coverImage?.sourceUrl} srcSet={coverImage?.srcSet} />
  return slug ? (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <a aria-label={title}>{image}</a>
    </Link>
  ) : (
    image
  )
}
