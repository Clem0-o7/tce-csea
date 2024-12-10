import Image from 'next/image';
import { motion } from 'framer-motion';

interface SectionProps {
  isMobile: boolean;
}

export default function HomeSection({ isMobile }: SectionProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <Image
          src="/images/csea-logo.png"
          alt="CSEA Logo"
          width={isMobile ? 150 : 200}
          height={isMobile ? 150 : 200}
          className="mx-auto"
        />
        
        <h1 className={`
          text-3xl md:text-5xl font-bold text-gray-800
          ${isMobile ? 'text-2xl' : ''}
        `}>
          Computer Science and Engineering Association
        </h1>
        
        <p className={`
          text-lg md:text-xl max-w-2xl mx-auto text-gray-600
          ${isMobile ? 'text-base' : ''}
        `}>
          Empowering future tech leaders through innovation, collaboration, and excellence.
        </p>
      </motion.div>
    </div>
  );
}