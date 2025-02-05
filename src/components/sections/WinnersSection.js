import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function WinnersSection({ onNextSection }) {
  const [winners, setWinners] = useState([]);
  const [topThree, setTopThree] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    async function fetchWinners() {
      try {
        const winnersResponse = await fetch(`/api/winners?limit=10&offset=${page * 10}`);
        const topThreeResponse = await fetch('/api/top-three-winners');
  
        if (!winnersResponse.ok) {
          throw new Error('Failed to fetch winners data');
        }
  
        if (!topThreeResponse.ok) {
          throw new Error('Failed to fetch top three data');
        }
  
        const winnersData = await winnersResponse.json();
        const topThreeData = await topThreeResponse.json();
  
        if (winnersData.length === 0) {
          setHasMore(false);
        } else {
          if (Array.isArray(winnersData)) {
            setWinners(prev => [...prev, ...winnersData]);
          }
        }
  
        const uniqueTopThree = Array.from(new Set(topThreeData.map(winner => winner.personId)))
          .map(id => topThreeData.find(winner => winner.personId === id));
  
        setTopThree(uniqueTopThree[0] || null);
      } catch (error) {
        console.error('Failed to fetch winners:', error);
      }
    }
  
    fetchWinners();
  }, [page]);
  
  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const renderRankBadge = (rank) => {
    const badgeColors = {
      'first': 'bg-yellow-500 text-white',
      'second': 'bg-gray-400 text-white',
      'third': 'bg-green-400 text-white'
    };

    const badgeIcons = {
      'first': <Trophy className="w-4 h-4 mr-2" />,
      'second': <Star className="w-4 h-4 mr-2" />,
      'third': <Star className="w-4 h-4 mr-2" />
    };

    return (
      <Badge 
        className={`${badgeColors[rank] || 'bg-gray-200'} flex items-center`}
      >
        {badgeIcons[rank]}
        {rank}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-primary">
          CSEA Top Achievers
        </h2>
        <p className="text-muted-foreground">
          Celebrating excellence in Computer Science and Engineering
        </p>
      </motion.div>

      {/* Top 3 Winners Banner */}
      {topThree && (
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-2">
            {topThree.eventName} - Latest Event Winners
          </h3>
          <div className="flex space-x-4">
            {topThree.winners.map((winner, index) => (
              <div key={`${winner.personId}-${index}`} className="flex items-center">
                {renderRankBadge(winner.rank)}
                <span>{winner.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Winners Table */}
      <Card className={`w-full ${isMobile ? 'max-h-[500px]' : 'max-h-[600px]'} overflow-auto`}>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>CSEA Top Achievers Ranking</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Total Points</TableHead>
                <TableHead>Event Achievements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {winners.map((winner) => (
                <TableRow key={`${winner.personId}-${winner.name}`}>
                  <TableCell>{winner.name}</TableCell>
                  <TableCell>{winner.batch}</TableCell>
                  <TableCell>{winner.totalPoints}</TableCell>
                  <TableCell>
                    <div className="space-y-2 max-h-[100px] overflow-y-auto">
                      {winner.events.map((event, idx) => (
                        <div key={`${event.eventName}-${idx}`} className="flex items-center space-x-2">
                          {renderRankBadge(event.rank)}
                          <span>{event.eventName} ({event.year})</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore}>
            Load More Winners
          </Button>
        </div>
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
}
