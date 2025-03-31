"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, Info, Calendar, Users, BookOpen, Image, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#home", label: "Home", icon: <Home className="h-5 w-5" /> },
  { href: "#about", label: "About", icon: <Info className="h-5 w-5" /> },
  { href: "#events", label: "Events", icon: <Calendar className="h-5 w-5" /> },
  { href: "#office-bearers", label: "Office Bearers", icon: <Users className="h-5 w-5" /> },
  { href: "#magazine", label: "Magazine", icon: <BookOpen className="h-5 w-5" /> },
  { href: "#gallery", label: "Gallery", icon: <Image className="h-5 w-5" /> },
];

export function Navbar({ activeSection }) {
  const [visible, setVisible] = useState(true);
  const { setTheme, theme } = useTheme();
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - (scrollYProgress.getPrevious() || 0);
      if (scrollYProgress.get() < 0.05 || direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-10 inset-x-0 mx-auto z-50 max-w-fit border border-transparent",
          "dark:border-white/[0.2] dark:bg-black bg-white/80 backdrop-blur-md",
          "rounded-full shadow-lg px-4 py-2"
        )}
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                className={cn(
                  "relative dark:text-neutral-50 text-neutral-600",
                  "hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors duration-200",
                  activeSection === item.href.replace("#", "") && "text-primary"
                )}
                onClick={() => handleNavClick(item.href)}
              >
                <span className="md:hidden">{item.icon}</span>
                <span className="hidden md:block text-sm">{item.label}</span>
                {activeSection === item.href.replace("#", "") && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 relative"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 rotate-0 scale-0 dark:scale-100" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 scale-100 dark:scale-0 dark:-rotate-90" />
          </Button>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
