import { useState, useEffect } from "react"
import Footer from "@/components/Footer"
import { getAllGalleryImages } from "@/db/queries/gallery"
import Image from "next/image"
import { groupBy } from "lodash"
import Masonry from "react-masonry-css"
import { ThemeProvider } from "next-themes"
import Head from "next/head"
import { formatISO } from "date-fns"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

export default function GalleryPage({ galleryImages }) {
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  // Group images by academic year
  const imagesByYear = groupBy(galleryImages, "academicYear")
  const years = Object.keys(imagesByYear).sort((a, b) => b.localeCompare(a))

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  const filteredImages = selectedYear ? imagesByYear[selectedYear] : galleryImages

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        <Head>
          <title>CSE Gallery | Moments of Excellence</title>
          <meta name="description" content="Gallery of CSE events and memories" />
        </Head>

        

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <h1 className="text-4xl font-bold text-center dark:text-white">CSE Gallery</h1>
          </div>

          {/* Year Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={() => setSelectedYear(null)} variant={selectedYear === null ? "default" : "outline"}>
              All Years
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                onClick={() => setSelectedYear(year)}
                variant={selectedYear === year ? "default" : "outline"}
              >
                {year}
              </Button>
            ))}
          </div>

          {/* Masonry Gallery */}
          <AnimatePresence>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  className="gallery-item mb-4 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-full aspect-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.description || "Gallery Image"}
                      layout="responsive"
                      width={image.width || 800}
                      height={image.height || 600}
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {image.description && (
                    <p className="text-sm mt-2 text-center dark:text-gray-300">{image.description}</p>
                  )}
                </motion.div>
              ))}
            </Masonry>
          </AnimatePresence>

          {/* Image Modal */}
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl w-full">
              {selectedImage && (
                <div className="relative aspect-auto">
                  <Image
                    src={selectedImage.imageUrl || "/placeholder.svg"}
                    alt={selectedImage.description || "Gallery Image"}
                    layout="responsive"
                    width={selectedImage.width || 800}
                    height={selectedImage.height || 600}
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
              {selectedImage?.description && <p className="text-center mt-4">{selectedImage.description}</p>}
              <DialogClose asChild>
                <Button className="absolute top-2 right-2">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  try {
    const galleryImages = await getAllGalleryImages()

    // Convert Date objects to ISO strings
    const formattedGalleryImages = galleryImages.map((image) => ({
      ...image,
      uploadedAt: formatISO(new Date(image.uploadedAt)),
      createdAt: formatISO(new Date(image.createdAt)),
      updatedAt: formatISO(new Date(image.updatedAt)),
    }))

    return {
      props: {
        galleryImages: formattedGalleryImages,
      },
    }
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return {
      props: {
        galleryImages: [],
        error: "Failed to fetch gallery images",
      },
    }
  }
}

