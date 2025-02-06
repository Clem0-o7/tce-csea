import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import Masonry from 'react-masonry-css';

export default function GallerySection({ images, onNextSection }) {
  const isMobile = useIsMobile();

  // Filter images to include only those with in_carousal === true
  const filteredImages = images.filter((image) => image.in_carousal === true);

  // Masonry breakpoint columns configuration
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 relative">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Our Moments
      </h2>

      {/* Scrollable Gallery Container */}
      <div className="overflow-x-auto py-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div key={image.id} className="mb-6">
                <div className="relative w-full rounded-lg overflow-hidden">
                  <Link href={`/gallery`}>
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.description || "Gallery Image"}
                      width={image.width || 800}
                      height={image.height || 600}
                      className="w-full h-auto object-contain"
                    />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No images available</p>
          )}
        </Masonry>
      </div>

      {/* Optional: View More Button */}
      <div className="flex justify-end mt-6">
        <Link href="/gallery">
          <Button variant="outline" className="dark:text-white">
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
}
