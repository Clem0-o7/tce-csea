
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const images = [
  { id: 1, src: '/images/gallery/image1.jpg', alt: 'CSEA Event 1' },
  { id: 2, src: '/images/gallery/image2.jpg', alt: 'CSEA Event 2' },
  { id: 3, src: '/images/gallery/image3.jpg', alt: 'CSEA Event 3' },
  { id: 4, src: '/images/gallery/image4.jpg', alt: 'CSEA Event 4' },
  { id: 5, src: '/images/gallery/image5.jpg', alt: 'CSEA Event 5' },
  { id: 6, src: '/images/gallery/image6.jpg', alt: 'CSEA Event 6' },
  { id: 7, src: '/images/gallery/image7.jpg', alt: 'CSEA Event 7' },
  { id: 8, src: '/images/gallery/image8.jpg', alt: 'CSEA Event 8' },
  // Add more images here
];

const GalleryPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Head>
        <title>CSEA - Gallery</title>
        <meta name="description" content="View photos from CSEA events and activities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-8"
          >
            CSEA Gallery
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full h-96 mb-8"
          >
            <Image
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white"
              onClick={prevImage}
            >
              &lt;
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white"
              onClick={nextImage}
            >
              &gt;
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-8"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setShowAll(true)}>View More</Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl w-11/12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative aspect-square">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4"
            >
              {images.map((image) => (
                <div key={image.id} className="relative mb-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    layout="responsive"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;

