import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ThemeProvider } from 'next-themes'

// Components
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeSection from '@/components/sections/HomeSection'
import AboutSection from '@/components/sections/AboutSection'
import WinnersSection from '@/components/sections/WinnersSection'
import GallerySection from '@/components/sections/GallerySection'
import EventsSection from '@/components/sections/EventsSection'
import OfficeBearersSection from '@/components/sections/OfficeBearersSection'
import { MagazineSection } from '@/components/sections/MagazineSection'

// Database queries
import { getCarouselEvents } from '@/db/queries/events'
import { getCurrentOfficeBearers } from '@/db/queries/officeBearers'
import { getMagazines } from '@/db/queries/magazines'
import { getCarouselGalleryImages } from '@/db/queries/gallery'

// Utilities
import { formatISO } from 'date-fns'
import { fetchData } from '@/utils/dataFetching'
import { useDataManagement } from '@/utils/dataManagement'

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
  } = useDataManagement(initialData)

  // Smooth scroll progress indicator
  const scrollIndicatorWidth = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', '100%']
  )

  // Sections configuration
  const sections = [
    { id: 'home', component: HomeSection },
    { id: 'about', component: AboutSection },
    { 
      id: 'events', 
      component: ({ onNextSection }) => (
        <EventsSection 
          events={data.carouselEvents} 
          onNextSection={onNextSection} 
        />
      )
    },
    { 
      id: 'office-bearers', 
      component: ({ onNextSection }) => (
        <OfficeBearersSection 
          officeBearers={data.officeBearers} 
          onNextSection={onNextSection} 
        />
      ) 
    },
    { id: 'winners', component: WinnersSection },
    { 
      id: 'magazine', 
      component: ({ onNextSection }) => (
        <MagazineSection 
          magazines={data.magazines} 
          onNextSection={onNextSection} 
        />
      ) 
    },
    { 
      id: 'gallery', 
      component: ({ onNextSection }) => (
        <GallerySection 
          images={data.galleryImages} 
          onNextSection={onNextSection} 
        />
      ) 
    },
  ]

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection)
    const nextIndex = (currentIndex + 1) % sections.length
    const nextSectionId = sections[nextIndex].id
    const nextSection = document.getElementById(nextSectionId)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { 
        threshold: 0.5, 
        root: scrollRef.current 
      }
    )

    const sectionElements = document.querySelectorAll('section')
    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section))
    }
  }, [])

  // Fetch data on client-side if not available
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const [carouselEvents, officeBearers, magazines, galleryImages] = await Promise.all([
            getCarouselEvents(),
            getCurrentOfficeBearers(),
            getMagazines(),
            getCarouselGalleryImages(),
          ])

          // Convert Date objects to ISO strings
          const formattedGalleryImages = galleryImages.map(image => ({
            ...image,
            uploadedAt: formatISO(new Date(image.uploadedAt)),
            createdAt: formatISO(new Date(image.createdAt)),
            updatedAt: formatISO(new Date(image.updatedAt)), // Ensure updatedAt is also converted
          }))

          setData({
            carouselEvents,
            officeBearers,
            magazines,
            galleryImages: formattedGalleryImages,
          })
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
          setError('Failed to fetch data')
          setLoading(false)
        }
      }

      fetchData()
    } else {
      setLoading(false)
    }
  }, [initialData])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
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
              <Section onNextSection={scrollToNextSection} />
            </motion.section>
          ))}

          <Footer />
        </motion.div>
      </div>
    </ThemeProvider>
  )
}

// Server-side rendering to fetch carousel events, office bearers, magazines, and gallery images
export async function getServerSideProps() {
  try {
    const [carouselEvents, officeBearers, magazines, galleryImages] = await Promise.all([
      getCarouselEvents(),
      getCurrentOfficeBearers(),
      getMagazines(),
      getCarouselGalleryImages(),
    ])

    // Convert Date objects to ISO strings
    const formattedGalleryImages = galleryImages.map(image => ({
      ...image,
      uploadedAt: formatISO(new Date(image.uploadedAt)),
      createdAt: formatISO(new Date(image.createdAt)),
      updatedAt: formatISO(new Date(image.updatedAt)), // Ensure updatedAt is also converted
    }))

    return {
      props: {
        initialData: {
          carouselEvents,
          officeBearers,
          magazines,
          galleryImages: formattedGalleryImages,
        }
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        initialData: null,
        error: 'Failed to fetch data',
      },
    }
  }
}
