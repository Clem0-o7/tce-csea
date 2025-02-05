import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import WinnersSection from '@/components/sections/WinnersSection';
import GallerySection from '@/components/sections/GallerySection';
import EventsSection from '@/components/sections/EventsSection';
import OfficeBearersSection from '@/components/sections/OfficeBearersSection';
import { MagazineSection } from '@/components/sections/MagazineSection';

const sections = [
  { id: 'home', component: HomeSection },
  { id: 'about', component: AboutSection },
  { 
    id: 'events', 
    component: ({ onNextSection, data }) => (
      <EventsSection 
        events={data.carouselEvents} 
        onNextSection={onNextSection} 
      />
    )
  },
  { 
    id: 'office-bearers', 
    component: ({ onNextSection, data }) => (
      <OfficeBearersSection 
        officeBearers={data.officeBearers} 
        onNextSection={onNextSection} 
      />
    ) 
  },
  { id: 'winners', component: WinnersSection },
  { 
    id: 'magazine', 
    component: ({ onNextSection, data }) => (
      <MagazineSection 
        magazines={data.magazines} 
        onNextSection={onNextSection} 
      />
    ) 
  },
  { 
    id: 'gallery', 
    component: ({ onNextSection, data }) => (
      <GallerySection 
        images={data.galleryImages} 
        onNextSection={onNextSection} 
      />
    ) 
  },
];

export default sections;