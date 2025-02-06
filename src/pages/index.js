"use client"

import { useEffect, setError } from "react"
import Head from "next/head"
import { motion } from "framer-motion"

// Components
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuroraBackground } from "@/components/ui/aurora-background"
import GlobalLoading from "@/components/GlobalLoading"

// Sections configuration
import sections from "@/config/sectionsConfig"

// Utilities
import { fetchData } from "@/utils/dataFetching"
import { useDataManagement } from "@/utils/dataManagement"
import { useLoading } from "@/contexts/LoadingContext" 

export default function Home({ initialData }) {
  const { activeSection, setActiveSection, error, setError, data, setData } =
    useDataManagement(initialData)

  const { setIsLoading } = useLoading() 
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection)
    const nextIndex = (currentIndex + 1) % sections.length
    const nextSectionId = sections[nextIndex].id
    const nextSection = document.getElementById(nextSectionId)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
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
      { threshold: 0.5 },
    )

    const sectionElements = document.querySelectorAll("section")
    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section))
    }
  }, [setActiveSection])

  // Fetch data on client-side if not available
  useEffect(() => {
    if (!initialData) {
      const fetchDataAsync = async () => {
        setIsLoading(true) 
        try {
          const data = await fetchData(process.env.NEXT_PUBLIC_BASE_URL)
          setData(data)
        } catch (error) {
          console.error("Error fetching data:", error)
          setError("Failed to fetch data")
        } finally {
          setIsLoading(false) 
        }
      }

      fetchDataAsync()
    }
  }, [initialData, setData, setIsLoading]) 

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden">
      <Head>
        <title>Computer Science and Engineering Association</title>
        <meta
          name="description"
          content="Empowering future tech leaders through innovation, collaboration, and excellence."
        />
        <link rel="icon" href="/logo/logo.webp" />
      </Head>

      {/* Floating Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Global Loading Overlay */}
      <GlobalLoading />

      {/* Main Content */}
      <main className="relative w-full overflow-hidden">
        {/* Smooth Scrollable Container */}
        <motion.div
          className="scroll-container relative w-full"
          style={{
            scrollBehavior: "smooth",
            overscrollBehavior: "contain",
          }}
        >
          {sections.map(({ id, component: Section }, index) => (
            <motion.section
              key={id}
              id={id}
              className="min-h-screen w-full flex flex-col justify-center items-center relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-20%" }}
            >
              {index === 0 ? (
                <Section onNextSection={scrollToNextSection} data={data} />
              ) : (
                <AuroraBackground>
                  <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.1,
                      ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4 py-16 w-full max-w-7xl mx-auto"
                  >
                    <Section onNextSection={scrollToNextSection} data={data} />
                  </motion.div>
                </AuroraBackground>
              )}
            </motion.section>
          ))}

          <Footer />
        </motion.div>
      </main>
    </div>
  )
}

// Server-side data fetching 
export async function getServerSideProps() {
  try {
    const data = await fetchData(process.env.NEXT_PUBLIC_BASE_URL)
    return {
      props: {
        initialData: data,
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
      props: {
        initialData: null,
        error: "Failed to fetch data",
      },
    }
  }
}
