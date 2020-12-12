import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'

interface PostHeaderProps {
  title: string
  coverImage?: {
    sourceUrl: string
  }
  date?: string
}

export default function PostHeader({
  title,
  coverImage,
  date,
}: PostHeaderProps) {
  return (
    <>
      {!!coverImage && (
        <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
          <CoverImage title={title} coverImage={coverImage} />
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <PostTitle>{title}</PostTitle>
        {!!date && (
          <div className="mb-6 text-lg">
            Posted <Date dateString={date} />
          </div>
        )}
      </div>
    </>
  )
}
