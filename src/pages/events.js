//events.js
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const events = [
  {
    id: 1,
    title: 'Annual Hackathon',
    description: '24-hour coding competition to solve real-world problems.',
    image: '/images/hackathon.jpg',
  },
  {
    id: 2,
    title: 'Tech Talk Series',
    description: 'Industry experts share insights on emerging technologies.',
    image: '/images/tech-talk.jpg',
  },
  {
    id: 3,
    title: 'Code Sprint',
    description: 'Rapid coding challenge to test problem-solving skills.',
    image: '/images/code-sprint.jpg',
  },
  {
    id: 4,
    title: 'AI Workshop',
    description: 'Hands-on workshop on artificial intelligence and machine learning.',
    image: '/images/ai-workshop.jpg',
  },
  {
    id: 5,
    title: 'Networking Night',
    description: 'Connect with alumni and industry professionals.',
    image: '/images/networking.jpg',
  },
];

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const scrollRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationId;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollContainer) {
        if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>CSEA - Events</title>
        <meta name="description" content="Explore CSEA events and activities" />
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
            CSEA Events
          </motion.h1>

          <div className="mb-8 overflow-hidden">
            <motion.div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={300}
                    height={200}
                    className={`rounded-lg transition-opacity duration-300 ${
                      selectedEvent.id === event.id ? 'opacity-100' : 'opacity-50'
                    }`}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card text-card-foreground p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="text-muted-foreground">{selectedEvent.description}</p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EventsPage;

