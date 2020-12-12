import { X } from 'react-feather'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Iframe from './iframe'

const lightbox = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
}

const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

interface MediaProps {
  children: React.ReactNode
  src: string
}

function Media({ children, src }: MediaProps) {
  const [showLightbox, setShowLightbox] = useState(false)

  const toggleLightbox = () => setShowLightbox(!showLightbox)

  return (
    <>
      <motion.div
        initial="hidden"
        variants={lightbox}
        animate={showLightbox ? 'visible' : 'hidden'}
        transition={{ default: { duration: 0.2, ease: 'easeInOut' } }}
        className="flex flex-wrap items-center justify-center bg-green-400 fixed inset-0 z-50"
      >
        <motion.div
          variants={fade}
          animate={showLightbox ? 'visible' : 'hidden'}
          transition={{
            delay: 0.3,
            default: { duration: 0.2, ease: 'easeInOut' },
          }}
          className="absolute flex justify-end top-0 right-0 absolute cursor-pointer p-4"
          onClick={toggleLightbox}
        >
          <X className="absolute z-50 text-white" />
        </motion.div>

        {showLightbox && (
          <iframe
            src={src}
            className="border-none w-full p-16 sm:p-4"
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            height="800"
          />
        )}
      </motion.div>

      <div onClick={toggleLightbox}>{children}</div>
    </>
  )
}

export default Media
