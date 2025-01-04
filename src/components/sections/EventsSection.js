'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, isAfter } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from 'lucide-react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const EventsSection = ({ events, onNextSection }) => {
  const [selectedEvent, setSelectedEvent] = useState(events[0] || null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const [imageOrientation, setImageOrientation] = useState({});

  useEffect(() => {
    // Reinitialize Swiper when theme changes
    const swiper = document.querySelector('.swiper-container')?.swiper;
    if (swiper) {
      swiper.update();
    }
  }, [theme]);

  const handleImageLoad = (src, width, height) => {
    setImageOrientation((prev) => ({
      ...prev,
      [src]: width > height ? 'landscape' : 'portrait',
    }));
  };

  if (!events || events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-8">Our Events</h2>
        <p className="text-muted-foreground">No events are currently available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Events</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the exciting events organized by our Computer Science and Engineering Association
        </p>
      </div>
      
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
        effect={isMobile ? 'slide' : 'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={isMobile ? 1 : 2}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false, // Disable slide shadows for better appearance
        }}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 30 // Adjusted for better mobile responsiveness
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.realIndex;
          setSelectedEvent(events[activeIndex]);
        }}
        className="events-carousel mb-8 swiper-container"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className="flex justify-center">
            <Card className="w-full max-w-lg border-transparent"> {/* Transparent border */}
              <CardContent className="p-0">
                <div className="relative w-full h-64"> {/* Adjusted height */}
                  <Image
                    src={event.eventImage || '/placeholder-event.jpg'}
                    alt={event.name}
                    layout="fill"
                    className="rounded-t-lg object-contain" // Changed to object-contain
                    onLoadingComplete={({ naturalWidth, naturalHeight }) => handleImageLoad(event.eventImage, naturalWidth, naturalHeight)}
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedEvent && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col justify-center items-center mb-4">
              <h3 className="text-2xl font-semibold mb-2">{selectedEvent.name}</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {selectedEvent.description}
            </p>
            
            <div className="flex flex-col space-y-4">
              {selectedEvent.date && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(new Date(selectedEvent.date), 'PPPP')}</span>
                </div>
              )}
              {selectedEvent.time && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{selectedEvent.time}</span>
                </div>
              )}
              {selectedEvent.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
            </div>
            
            {isAfter(new Date(selectedEvent.date), new Date()) && selectedEvent.registrationLink && (
              <div className="mt-6">
                <Button asChild>
                  <Link 
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="text-center mt-12">
        <Button 
          onClick={onNextSection}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="mr-2">Next Section</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default EventsSection;
