import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactDialog from '@/components/ContactDialog';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Branding and Contact */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-2xl font-bold mb-2">CSEA</h3>
            <p className="text-sm mb-4">Empowering future tech leaders</p>
            <ContactDialog className="max-w-[6rem]" />
          </div>

          {/* Social and Connect */}
          <div className="flex flex-col items-end">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="p-1 text-sm">
                <a href="https://www.facebook.com/tce-csea" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="p-1 text-sm">
                <a href="https://www.twitter.com/tce-csea" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="p-1 text-sm">
                <a href="https://www.instagram.com/tce_csea_official/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="p-1 text-sm">
                <a href="https://www.linkedin.com/in/computer-science-engineering-association-tce-0b2473344/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CSEA. All rights reserved.
          </p>
          <p className="text-xs flex items-center justify-center space-x-1 mt-2">
            <span>Developed by</span>
            <Link
              href="https://www.linkedin.com/in/clement-andrew-"
              className="flex items-center hover:text-primary transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="h-4 w-4 ml-1">👨‍💻</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
