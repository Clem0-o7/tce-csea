// filepath: /D:/Projects/tce-csea/src/pages/index.js
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeProvider } from 'next-themes';

// Components
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sections configuration
import sections from '@/config/sectionsConfig';

// Utilities
import { fetchData } from '@/utils/dataFetching';
import { useDataManagement } from '@/utils/dataManagement';

export default function Home({ initialData }) {
  const {
    activeSection,
    setActiveSection,
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    scrollRef,
    scrollYProgress,
  } = useDataManagement(initialData);

  // Smooth scroll progress indicator
  const scrollIndicatorWidth = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', '100%']
  );

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSectionId = sections[nextIndex].id;
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
  }, [scrollRef, setActiveSection]);

  // Fetch data on client-side if not available
  useEffect(() => {
    if (!initialData) {
      const fetchDataAsync = async () => {
        setLoading(true);
        try {
          const data = await fetchData(process.env.NEXT_PUBLIC_BASE_URL);
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
          setLoading(false);
        }
      };

      fetchDataAsync();
    } else {
      setLoading(false);
    }
  }, [initialData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative">
        <Head>
          <title>CSEA - Computer Science and Engineering Association</title>
          <meta name="description" content="Empowering future tech leaders through innovation, collaboration, and excellence." />
          <link rel="icon" href="/logo/logo.webp" />
        </Head>

        <Navbar activeSection={activeSection} />

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
              <Section onNextSection={scrollToNextSection} data={data} />
            </motion.section>
          ))}

          <Footer />
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

//fetch carousel events, office bearers, magazines, and gallery images
export async function getServerSideProps() {
  try {
    const data = await fetchData(process.env.NEXT_PUBLIC_BASE_URL);
    return {
      props: {
        initialData: data,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: null,
        error: 'Failed to fetch data',
      },
    };
  }
}