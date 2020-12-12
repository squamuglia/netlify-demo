import { useRouter } from 'next/router'
import { sanitizeWPContent } from 'lib/utils'

export default function useTranslator() {
  const router = useRouter()
  const isSpanish = router.locale.includes('es')

  return (post, field) => {
    if (!post) {
      return null
    }
    const translated = post?.[`${field}_spanish`]

    return isSpanish && translated
      ? sanitizeWPContent(translated)
      : sanitizeWPContent(post[field])
  }
}

export function useIsSpanish() {
  const router = useRouter()
  const isSpanish = router.locale.includes('es')

  return isSpanish
}
