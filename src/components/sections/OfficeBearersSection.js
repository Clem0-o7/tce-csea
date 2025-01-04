import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, GitlabIcon as GitHub, Globe, Instagram } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';

// Social icon mapping
const socialIcons = {
  linkedin: Linkedin,
  github: GitHub,
  website: Globe,
  instagram: Instagram,
};

const OfficeBearersSection = ({ officeBearers = [], onNextSection }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const scrollRef = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleTouchMove = (e) => {
      const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // Adjust the multiplier for sensitivity
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleTouchStart);
      scrollContainer.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  // Render social links dynamically
  const renderSocialLinks = (socialLinks) => {
    if (!socialLinks) return null;

    return Object.entries(socialLinks)
      .filter(([platform]) => platform in socialIcons)
      .slice(0, 3)
      .map(([platform, link]) => {
        const Icon = socialIcons[platform];
        return (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Icon
              className={`w-6 h-6 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            />
          </a>
        );
      });
  };

  return (
    <section
      id="office-bearers"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden py-16"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Our Office Bearers
        </h2>

        <div className="relative w-full">
          <div
            ref={scrollRef}
            className={`flex space-x-4 md:space-x-8 overflow-x-auto pb-4 snap-x snap-mandatory ${
              isMobile ? 'snap-center' : ''
            }`}
            style={{ scrollBehavior: 'smooth' }}
          >
            {officeBearers.map((bearer) => (
              <motion.div
                key={bearer.id}
                className={`flex-shrink-0 ${
                  isMobile ? 'w-full' : 'w-[250px]'
                } p-4 rounded-lg transition-all duration-300 snap-center ${
                  hoveredCard === bearer.id ? 'scale-105 shadow-xl' : 'scale-100 shadow-md'
                } ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                onHoverStart={() => setHoveredCard(bearer.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-56 h-56 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={bearer.profileImage || '/default-avatar.png'}
                    alt={bearer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <h3 className="text-xl font-semibold">{bearer.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{bearer.position}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {bearer.department} | Batch {bearer.batch}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === bearer.id ? 1 : 0 }}
                  className="flex justify-center space-x-4 mt-2 h-6"
                >
                  {renderSocialLinks(bearer.socialLinks)}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Button 
          onClick={onNextSection}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="mr-2">Next Section</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </Button>
      </div>
    </section>
  );
};

export default OfficeBearersSection;
