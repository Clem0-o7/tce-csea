//components/Footer.js
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">CSEA</h3>
            <p className="text-sm">Empowering future tech leaders</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon"><Facebook className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><Twitter className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><Instagram className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><Linkedin className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CSEA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

