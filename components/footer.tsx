import { useIsSpanish } from 'hooks/translate'
import { Instagram, Facebook, Youtube } from 'react-feather'
import Link from 'next/link'
import Container from './container'

export default function Footer() {
  const isSpanish = useIsSpanish()

  return (
    <footer className="bg-accent-1 border-t border-accent-2" id="contact">
      <Container style="pt-12">
        <h2 className="text-4xl lg:text-5xl font-bold leading-tight lg:text-left mb-4">
          {isSpanish ? 'Contactarnos' : 'Get in Touch.'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-12 pb-28">
          <div>
            <p className="font-semibold">
              {isSpanish
                ? 'Interesado en trabajar con nosotros?'
                : 'Interested in working with us?'}
            </p>
            <p>
              {isSpanish
                ? 'Contáctanos directamente en '
                : 'Contact us directly at '}
              <a href="mailto:info@fneinternational.org">
                info@fneinternational.org
              </a>
            </p>
            <p className="font-semibold">
              {isSpanish
                ? 'Las donaciones monetarias se pueden enviar a:'
                : 'Monetary donations can be sent to:'}
            </p>
            <p>
              FNE International
              <br />
              P.O.Box 890286
              <br />
              E.Weymouth, MA 02189
            </p>
            <p className="font-semibold">
              {isSpanish
                ? 'Para donaciones de material:'
                : 'For material donations:'}
            </p>
            <p>
              {isSpanish ? 'Envíe un email a ' : 'Please email '}
              <a href="mailto:info@fneinternational.org">
                info@fneinternational.org
              </a>
            </p>
          </div>
          <div>
            <p className="font-semibold">
              {isSpanish ? 'Síguenos' : 'Follow us'}
            </p>
            <div className="flex mt-4">
              <a
                href="https://www.youtube.com/channel/UCcYKKL0NrmrFawUbP9Mg65A"
                target="_blank"
              >
                <Instagram className="mr-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCcYKKL0NrmrFawUbP9Mg65A"
                target="_blank"
              >
                <Facebook className="mr-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCcYKKL0NrmrFawUbP9Mg65A"
                target="_blank"
              >
                <Youtube />
              </a>
            </div>

            <p className="font-semibold mt-8">
              {isSpanish ? 'Prefer english?' : 'Prefiere español?'}
            </p>
            <Link href="" locale={isSpanish ? 'en' : 'es'}>
              <button className="button">
                {isSpanish ? 'View in English' : 'Ver en español'}
              </button>
            </Link>
          </div>
        </div>
      </Container>
      <div className="p-4 text-center text-sm">
        © {new Date().getFullYear()} FNE International, a 501(c) 3 Non-Profit
      </div>
    </footer>
  )
}
