import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import { HyperText } from "@/components/ui/hyper-text";
import { useIsMobile } from "@/hooks/use-mobile"; // Use the correct hook

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile(); // Use the correct mobile detection hook

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const logoVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  };

  const onNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <Image
        src="/top/tce-bg.jpg"
        alt="College Building"
        fill
        quality={100}
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50 transition-colors duration-300"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white dark:text-gray-200 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center justify-center h-full w-full"
        >
          <motion.div variants={logoVariants} animate="animate" className="mb-8">
            <Image src="/logo/logo.webp" alt="CSEA Logo" width={150} height={150} className="mx-auto" />
          </motion.div>
          <HyperText className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-shadow-lg" text="Welcome to CSEA" />

          {/* Responsive Text Handling */}
          {isMobile ? (
            <div className="flex flex-col items-center gap-1 text-center">
              <HyperText className="text-xl font-semibold text-shadow-md" text="Computer Science" />
              <HyperText className="text-xl font-semibold text-shadow-md" text="and" />
              <HyperText className="text-xl font-semibold text-shadow-md" text="Engineering Association" />
            </div>
          ) : (
            <HyperText className="text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto text-shadow-md whitespace-nowrap" text="Computer Science and Engineering Association" />
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-[50%] transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={onNextSection}
      >
        <ChevronDown size={40} className="text-white dark:text-gray-200 animate-bounce" />
      </motion.div>
    </div>
  );
}
