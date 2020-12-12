import { Maybe, Member_Memberdetails, MediaItem } from 'generated/graphql'

interface MemberProps {
  member: Maybe<
    { __typename?: 'Member_Memberdetails' } & Pick<
      Member_Memberdetails,
      'name' | 'position' | 'project' | 'team' | 'email'
    > & {
        image?: Maybe<
          { __typename?: 'MediaItem' } & Pick<
            MediaItem,
            'id' | 'sourceUrl' | 'title'
          >
        >
      }
  >
}

export default function Member({ member }: MemberProps) {
  return (
    <div>
      <img
        src={member.image.sourceUrl}
        alt={member.image.title}
        width="100%"
        className="object-cover h-90"
      />
      <h3 className="mt-3">{member.name}</h3>
      <p className="m-0">{member.position}</p>
      <a href={`mailto:${member.email}`}>{member.email}</a>
    </div>
  )
}
