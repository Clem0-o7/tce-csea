'use client';

import React, { useState } from 'react';
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

  // Sort bearers by batch
  const sortedBearers = [...officeBearers].sort((a, b) => a.batch - b.batch);

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
            <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          </a>
        );
      });
  };

  return (
    <section id="office-bearers" className="relative min-h-screen flex flex-col justify-center items-center py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Our Office Bearers
        </h2>

        {/* Mobile View (Grid Layout) */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedBearers.map((bearer) => (
              <motion.div
                key={bearer.id}
                className={`p-2 rounded-lg transition-all duration-300 text-center ${
                  hoveredCard === bearer.id ? 'scale-105 shadow-xl' : 'scale-100 shadow-md'
                } ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                onHoverStart={() => setHoveredCard(bearer.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={bearer.profileImage || '/default-avatar.png'}
                    alt={bearer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-sm md:text-lg font-semibold">{bearer.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{bearer.position}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {bearer.department} | Batch {bearer.batch}
                </p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: hoveredCard === bearer.id ? 1 : 0 }} className="flex justify-center space-x-4 mt-2 h-6">
                  {renderSocialLinks(bearer.socialLinks)}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop View (Two Rows Grid Layout)
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sortedBearers.map((bearer) => (
              <motion.div
                key={bearer.id}
                className={`p-2 rounded-lg transition-all duration-300 text-center ${
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
                    priority={false}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-sm md:text-lg font-semibold">{bearer.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{bearer.position}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {bearer.department} | Batch {bearer.batch}
                </p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: hoveredCard === bearer.id ? 1 : 0 }} className="flex justify-center space-x-4 mt-2 h-6">
                  {renderSocialLinks(bearer.socialLinks)}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficeBearersSection;
