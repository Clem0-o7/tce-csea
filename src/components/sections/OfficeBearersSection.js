'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { SiLinkedin, SiGithub, SiInstagram } from 'react-icons/si';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@/hooks/use-media-query';

// Social icon mapping
const socialIcons = {
  linkedin: SiLinkedin,
  github: SiGithub,
  website: Globe,
  instagram: SiInstagram,
};

const OfficeBearersSection = ({ officeBearers = [] }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const scrollRefTop = useRef(null);
  const scrollRefBottom = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e, ref) => {
      if (ref.current) {
        startX.current = e.touches[0].pageX - ref.current.offsetLeft;
        scrollLeft.current = ref.current.scrollLeft;
      }
    };

    const handleTouchMove = (e, ref) => {
      if (ref.current) {
        const x = e.touches[0].pageX - ref.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Adjust the multiplier for sensitivity
        ref.current.scrollLeft = scrollLeft.current - walk;
      }
    };

    const scrollContainers = [scrollRefTop.current, scrollRefBottom.current];
    scrollContainers.forEach((scrollContainer) => {
      if (scrollContainer) {
        scrollContainer.addEventListener('touchstart', (e) => handleTouchStart(e, scrollContainer));
        scrollContainer.addEventListener('touchmove', (e) => handleTouchMove(e, scrollContainer));
      }
    });

    return () => {
      scrollContainers.forEach((scrollContainer) => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('touchstart', (e) => handleTouchStart(e, scrollContainer));
          scrollContainer.removeEventListener('touchmove', (e) => handleTouchMove(e, scrollContainer));
        }
      });
    };
  }, []);

  // Split office bearers by batch
  const sortedBearers = [...officeBearers].sort((a, b) => a.batch - b.batch);

  const midIndex = Math.ceil(sortedBearers.length / 2);
  const olderBatch = sortedBearers.slice(0, midIndex);
  const newerBatch = sortedBearers.slice(midIndex);

  // Render social links dynamically
  const renderSocialLinks = (socialLinks) => {
    if (!socialLinks) return null;

    return Object.entries(socialLinks)
      .filter(([platform, link]) => platform in socialIcons && link)
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

  const renderBearers = (bearers) => (
    <div
      className={`flex space-x-4 md:space-x-8 overflow-x-auto pb-4 snap-x snap-mandatory ${
        isMobile ? 'snap-center' : ''
      }`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {bearers.map((bearer) => (
        <motion.div
          key={bearer.id}
          className={`flex-shrink-0 w-[150px] md:w-[200px] p-2 rounded-lg transition-all duration-300 snap-center ${
            hoveredCard === bearer.id ? 'scale-105 shadow-xl' : 'scale-100 shadow-md'
          } ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          onHoverStart={() => setHoveredCard(bearer.id)}
          onHoverEnd={() => setHoveredCard(null)}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden">
            <Image
              src={bearer.profileImage || '/default-avatar.png'}
              alt={bearer.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <h3 className="text-sm md:text-lg font-semibold">{bearer.name}</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{bearer.position}</p>
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
  );

  return (
    <section
      id="office-bearers"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden py-16"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Our Office Bearers
        </h2>

        <div className="relative w-full space-y-8">
          <div ref={scrollRefTop}>
            {renderBearers(olderBatch)}
          </div>
          <div ref={scrollRefBottom}>
            {renderBearers(newerBatch)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeBearersSection;
