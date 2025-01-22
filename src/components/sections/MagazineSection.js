import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile' // Import the hook

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export function MagazineSection({ magazines }) {
  const isMobile = useIsMobile()

  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">
          Our Magazines
        </h2>
        
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          className="magazine-swiper"
        >
          {magazines.map((magazine) => (
            <SwiperSlide key={magazine.id} className="flex flex-col items-center">
              <Link 
                href={magazine.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative w-full h-72 md:w-72 md:h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src={magazine.thumbnailUrl} 
                    alt={magazine.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold dark:text-white">
                    {magazine.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-left">
                    {magazine.year}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </section>
  )
}
