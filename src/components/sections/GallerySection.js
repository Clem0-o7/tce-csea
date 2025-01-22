import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile'; // Updated import

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function GallerySection({ images, onNextSection }) {
  const isMobile = useIsMobile(); // Updated hook usage

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 relative">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Our Moments
      </h2>
      
      {images && images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 1} // Adjusted slidesPerView
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="gallery-swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                <Image 
                  src={image.imageUrl} 
                  alt={image.description || 'Gallery Image'} 
                  fill 
                  className="object-contain hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No images available</p>
      )}

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