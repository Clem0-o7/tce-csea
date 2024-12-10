//about.js
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cpu, Users, Lightbulb, Award } from 'lucide-react';

const aboutContent = [
  {
    icon: Cpu,
    title: 'Technical Excellence',
    description: 'We foster a culture of continuous learning and technical proficiency in computer science and engineering.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'CSEA creates a supportive network for students to collaborate, share knowledge, and grow together.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We encourage creative thinking and innovative solutions to real-world problems in technology.',
  },
  {
    icon: Award,
    title: 'Leadership',
    description: 'CSEA develops future leaders in the field of computer science and engineering.',
  },
];

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>CSEA - About Us</title>
        <meta name="description" content="Learn about the Computer Science and Engineering Association" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">About CSEA</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The Computer Science and Engineering Association (CSEA) is dedicated to fostering excellence, innovation, and community among computer science and engineering students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {aboutContent.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card text-card-foreground p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <item.icon className="h-8 w-8 text-primary mr-4" />
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CSEA aims to bridge the gap between academic learning and industry requirements by organizing workshops, seminars, coding competitions, and networking events. We strive to create a platform where students can explore their potential, showcase their skills, and prepare for successful careers in the ever-evolving field of technology.
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;

