import { useIsMobile } from '@/hooks/use-mobile' // Import the hook
import Image from 'next/image'
import Link from 'next/link'

// Import React Slick styles
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

export function MagazineSection({ magazines }) {
  const isMobile = useIsMobile()

  // Determine the number of slides to show based on the number of magazines
  const slidesToShow = magazines.length === 1 ? 1 : 2

  const settings = {
    dots: true,
    infinite: magazines.length > 1,
    speed: 1000,
    slidesToShow: isMobile ? 1 : slidesToShow, // Show 1 slide on mobile, 2 on larger screens
    slidesToScroll: 1,
    autoplay: magazines.length > 1,
    arrows: false,
    centerMode: false,
    centerPadding: '0',
    autoplaySpeed: 5000,
  }

  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">
          Our Magazines
        </h2>

        <Slider {...settings} className="magazine-carousel">
          {magazines.map((magazine, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link 
                href={magazine.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative w-full md:w-96 h-72 md:h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 mx-auto">
                  <Image 
                    src={magazine.thumbnailUrl} 
                    alt={magazine.name}
                    layout="fill"
                    objectFit="contain"
                    className="object-center mx-auto"
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
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
