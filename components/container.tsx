import cx from 'classnames'

interface Props {
  style?: string
  children: React.ReactNode
}

export default function Container({ style, children }: Props) {
  return <div className={cx('container mx-auto px-5', style)}>{children}</div>
}
