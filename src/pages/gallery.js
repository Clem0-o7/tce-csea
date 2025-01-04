import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllGalleryImages } from '@/db/queries/gallery';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { groupBy } from 'lodash';
import Masonry from 'react-masonry-css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { formatISO } from 'date-fns';
import Link from 'next/link';

export default function GalleryPage({ galleryImages }) {
    // const isMobile = useIsMobile(); // Removed unused variable
    const [selectedYear, setSelectedYear] = useState(null);

    // Group images by academic year
    const imagesByYear = groupBy(galleryImages, 'academicYear');
    const years = Object.keys(imagesByYear).sort((a, b) => b.localeCompare(a));

    // Masonry breakpoints
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
                <Head>
                    <title>CSE Gallery | Moments of Excellence</title>
                    <meta name="description" content="Gallery of CSE events and memories" />
                </Head>
                
                
                
                <main className="flex-grow container mx-auto px-4 py-12">
                    <div className="flex justify-between items-center mb-8">
                        <Link href="/" className="button">
                            Home
                        </Link>
                        <h1 className="text-4xl font-bold text-center dark:text-white">
                            CSE Gallery
                        </h1>
                    </div>
                    
                    {/* Year Selector */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button 
                            onClick={() => setSelectedYear(null)}
                            className={`px-4 py-2 rounded ${selectedYear === null 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
                        >
                            All Years
                        </button>
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 py-2 rounded ${selectedYear === year 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Gallery */}
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {(selectedYear 
                            ? imagesByYear[selectedYear] 
                            : galleryImages
                        ).map((image) => (
                            <div 
                                key={image.id} 
                                className="gallery-item mb-4 hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative w-full aspect-auto rounded-lg overflow-hidden shadow-lg">
                                    <Image 
                                        src={image.imageUrl} 
                                        alt={image.description || 'Gallery Image'} 
                                        layout="responsive"
                                        width={image.width || 800}
                                        height={image.height || 600}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                {image.description && (
                                    <p className="text-sm mt-2 text-center dark:text-gray-300">
                                        {image.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </Masonry>
                </main>
                
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export async function getServerSideProps() {
    try {
        const galleryImages = await getAllGalleryImages();

        // Convert Date objects to ISO strings
        const formattedGalleryImages = galleryImages.map(image => ({
            ...image,
            uploadedAt: formatISO(new Date(image.uploadedAt)),
            createdAt: formatISO(new Date(image.createdAt)),
            updatedAt: formatISO(new Date(image.updatedAt)), // Ensure updatedAt is also converted
        }));

        return {
            props: {
                galleryImages: formattedGalleryImages,
            }
        };
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return {
            props: {
                galleryImages: [],
                error: 'Failed to fetch gallery images',
            },
        };
    }
}