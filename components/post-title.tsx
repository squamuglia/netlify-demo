type Props = {
  children: string
}

export default function PostTitle({ children }: Props) {
  return (
    <h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
