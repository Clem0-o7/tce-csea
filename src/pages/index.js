import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMobile } from '@/hooks/use-mobile';

// Import sections
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import EventsSection from '@/components/sections/EventsSection';
import WinnersSection from '@/components/sections/WinnersSection';
import GallerySection from '@/components/sections/GallerySection';

export default function Home() {
  const isMobile = useMobile();
  const [activeSection, setActiveSection] = useState('home');
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // Smooth scroll progress indicator
  const scrollIndicatorWidth = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', '100%']
  );

  // Sections configuration
  const sections = [
    { id: 'home', component: HomeSection },
    { id: 'about', component: AboutSection },
    { id: 'events', component: EventsSection },
    { id: 'winners', component: WinnersSection },
    { id: 'gallery', component: GallerySection },
  ];

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.5, 
        root: scrollRef.current 
      }
    );

    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="relative">
      <Head>
        <title>CSEA - Computer Science and Engineering Association</title>
        <meta name="description" content="CSEA - Empowering future tech leaders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar 
        activeSection={activeSection} 
        isMobile={isMobile} 
      />

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50" 
        style={{ 
          width: scrollIndicatorWidth,
          transformOrigin: 'left center' 
        }} 
      />

      {/* Smooth Scrollable Container */}
      <motion.div 
        ref={scrollRef}
        className="scroll-container overflow-y-scroll h-screen"
        style={{ 
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain'
        }}
      >
        {sections.map(({ id, component: Section }) => (
          <motion.section
            key={id}
            id={id}
            className="min-h-screen flex flex-col justify-center items-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { duration: 0.8 } 
            }}
            viewport={{ once: false }}
          >
            <Section isMobile={isMobile} />
          </motion.section>
        ))}

        <Footer />
      </motion.div>
    </div>
  );
}