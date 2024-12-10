import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const winnersData = [
  { id: 1, name: 'John Doe', event: 'Annual Hackathon', year: 2023, position: 1 },
  { id: 2, name: 'Jane Smith', event: 'Code Sprint', year: 2023, position: 2 },
  { id: 3, name: 'Bob Johnson', event: 'AI Challenge', year: 2023, position: 3 },
  { id: 4, name: 'Alice Brown', event: 'Tech Quiz', year: 2023, position: 4 },
  { id: 5, name: 'Charlie Davis', event: 'Web Design Contest', year: 2023, position: 5 },
  { id: 6, name: 'Eva Wilson', event: 'Mobile App Challenge', year: 2022, position: 1 },
  { id: 7, name: 'Frank Miller', event: 'Data Science Competition', year: 2022, position: 2 },
  { id: 8, name: 'Grace Lee', event: 'Cybersecurity Challenge', year: 2022, position: 3 },
  { id: 9, name: 'Henry Taylor', event: 'IoT Innovation Contest', year: 2022, position: 4 },
  { id: 10, name: 'Ivy Chen', event: 'Cloud Computing Challenge', year: 2022, position: 5 },
];

const WinnersPage = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const years = ['All', ...new Set(winnersData.map(winner => winner.year))];

  const filteredWinners = selectedYear === 'All'
    ? winnersData
    : winnersData.filter(winner => winner.year === parseInt(selectedYear));

  return (
    <>
      <Head>
        <title>CSEA - Winners</title>
        <meta name="description" content="Celebrate the achievements of CSEA event winners" />
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
            CSEA Winners
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWinners.map((winner) => (
                  <TableRow key={winner.id} className={winner.position <= 3 ? 'font-bold' : ''}>
                    <TableCell>{winner.position}</TableCell>
                    <TableCell>{winner.name}</TableCell>
                    <TableCell>{winner.event}</TableCell>
                    <TableCell>{winner.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 bg-primary text-primary-foreground p-4 overflow-hidden"
          >
            <div className="whitespace-nowrap animate-marquee">
              {winnersData.map((winner) => (
                <span key={winner.id} className="inline-block mx-4">
                  {winner.name} - {winner.event} ({winner.year})
                </span>
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WinnersPage;

