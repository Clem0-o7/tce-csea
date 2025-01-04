import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ChevronDown } from 'lucide-react'

export default function HomeSection({ onNextSection }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const logoVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/top/tce-bg.jpg"
        alt="College Building"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="brightness-50"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white dark:text-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={logoVariants}
            animate="animate"
            className="mb-8"
          >
            <Image
              src="/logo/logo.webp"
              alt="CSEA Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Welcome to CSEA
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto">
            Computer Science and Engineering Association
          </p>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto">
            Empowering future tech leaders through innovation, collaboration, and excellence.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-[48.5%] transform -translate-x-1/2 z-20 cursor-pointer"

        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNextSection}
      >
        <ChevronDown size={40} className="text-white dark:text-gray-200" />
      </motion.div>
    </div>
  )
}

