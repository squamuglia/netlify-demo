import Container from 'components/container'

export default function Hero({ src, children }) {
  return (
    <div className="relative bg-green-700 relative" style={{ height: '50vh' }}>
      <div
        style={{
          background: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          height: '50vh',
          opacity: 0.3,
        }}
        className="absolute w-full z-0"
      />
      <Container style="z-10">
        <div
          className="relative grid grid-cols-2 sm:grid-cols-1 gap-4 items-center text-white"
          style={{ height: '50vh' }}
        >
          {children}
        </div>
      </Container>
    </div>
  )
}
