import { useState, FormEvent } from 'react'
import { useIsSpanish } from 'hooks/translate'
import Container from 'components/container'

export default function NewsletterSignup() {
  const [email, setEmail] = useState<string>()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const isSpanish = useIsSpanish()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(undefined)

    if (!email.length || !email.includes('@')) {
      setError('Please add a complete email address')
    }

    try {
      const res = await fetch('/api/subscribe', {
        body: JSON.stringify({ email, language: isSpanish ? 'es' : 'en' }),
        method: 'POST',
      })
      console.log(res)

      // setSuccess(true)
    } catch (e) {
      setError(isSpanish ? e.errorEs : e.error)
    }
  }

  return (
    <div className="bg-gray-200 white">
      <Container style="py-12">
        <div>
          <h2>Keep Up To Date With FNEI</h2>
          <p>
            Sign up for our newsletter and receive monthly updates (and no spam)
          </p>
        </div>

        {success ? (
          <p className="">Your email has been added to our list!</p>
        ) : (
          <form className="max-w-lg" onSubmit={onSubmit}>
            <label>
              Email
              <input
                placeholder="Email"
                type="email"
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </label>
            {!!error && <p className="text-red">{error}</p>}
            <button className="button mb-4" type="submit">
              Submit
            </button>
          </form>
        )}
      </Container>
    </div>
  )
}
