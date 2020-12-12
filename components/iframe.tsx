interface Props {
  src: string
}
export default function iFrame({ src }: Props) {
  if (!src) {
    return <div>loading...</div>
  }

  return (
    <iframe
      src={src}
      className="border-none w-full h-auto p-16 sm:p-4"
      scrolling="no"
      frameBorder="0"
      allowFullScreen
    />
  )
}
