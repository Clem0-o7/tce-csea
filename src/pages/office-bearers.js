import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const officeBearers = [
  {
    id: 1,
    name: 'John Doe',
    title: 'President',
    image: '/images/john-doe.jpg',
    linkedin: 'https://www.linkedin.com/in/johndoe',
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'Vice President',
    image: '/images/jane-smith.jpg',
    linkedin: 'https://www.linkedin.com/in/janesmith',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    title: 'Secretary',
    image: '/images/mike-johnson.jpg',
    linkedin: 'https://www.linkedin.com/in/mikejohnson',
  },
  {
    id: 4,
    name: 'Emily Brown',
    title: 'Treasurer',
    image: '/images/emily-brown.jpg',
    linkedin: 'https://www.linkedin.com/in/emilybrown',
  },
  {
    id: 5,
    name: 'Chris Lee',
    title: 'Technical Lead',
    image: '/images/chris-lee.jpg',
    linkedin: 'https://www.linkedin.com/in/chrislee',
  },
  {
    id: 6,
    name: 'Sarah Davis',
    title: 'Event Coordinator',
    image: '/images/sarah-davis.jpg',
    linkedin: 'https://www.linkedin.com/in/sarahdavis',
  },
];

const OfficeBearersPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const scrollRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <>
      <Head>
        <title>CSEA - Office Bearers</title>
        <meta name="description" content="Meet the CSEA office bearers" />
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
            CSEA Office Bearers
          </motion.h1>

          <div className="relative">
            <motion.div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {officeBearers.map((bearer) => (
                <motion.div
                  key={bearer.id}
                  className="flex-shrink-0 w-64 h-64 relative"
                  onHoverStart={() => setHoveredId(bearer.id)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  <Image
                    src={bearer.image}
                    alt={bearer.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === bearer.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-white text-xl font-bold">{bearer.name}</h2>
                    <p className="text-white text-sm">{bearer.title}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mt-2 text-white hover:text-primary"
                            onClick={() => window.open(bearer.linkedin, '_blank')}
                          >
                            <Linkedin className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Connect on LinkedIn</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleScroll(-200)}
            >
              &lt;
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleScroll(200)}
            >
              &gt;
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OfficeBearersPage;

