'use client'

import { useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#office-bearers", label: "Office Bearers" },
  { href: "#winners", label: "Winners" },
  { href: "#magazine", label: "Magazine" },
  { href: "#gallery", label: "Gallery" },
]

export function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  const handleNavClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "bg-background/80 backdrop-blur-md shadow-md",
        "p-2" // Reduced padding to make the header thinner
      )}
    >
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between py-2">
          <NavbarBrand handleNavClick={handleNavClick} />
          <DesktopNav activeSection={activeSection} handleNavClick={handleNavClick} />
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <MobileMenuToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
        <MobileNav isMenuOpen={isMenuOpen} activeSection={activeSection} handleNavClick={handleNavClick} />
      </div>
    </header>
  )
}

function NavbarBrand({ handleNavClick }) {
  return (
    <Link 
      href="#home" 
      className="flex items-center space-x-2"
      onClick={() => handleNavClick("#home")}
    >
      <Image
        src="/logo/logo.webp"
        alt="CSEA Logo"
        width={48} // Reduced width
        height={48} // Reduced height
        className="transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <span className="font-semibold text-xl text-foreground"> 
        CSEA
      </span>
    </Link>
  )
}

function DesktopNav({ activeSection, handleNavClick }) {
  return (
    <nav className="hidden md:flex space-x-4"> 
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "relative text-foreground/60 hover:text-foreground transition-colors duration-200",
            activeSection === item.href.replace('#', '') && "text-foreground font-semibold"
          )}
          onClick={(e) => {
            e.preventDefault()
            handleNavClick(item.href)
          }}
        >
          {item.label}
          {activeSection === item.href.replace('#', '') && (
            <motion.span 
              layoutId="desktopUnderline"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </Link>
      ))}
    </nav>
  )
}

function MobileNav({ isMenuOpen, activeSection, handleNavClick }) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md shadow-md"
        >
          <ul className="flex flex-col items-center space-y-2 py-4"> 
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-foreground/60 hover:text-foreground transition-colors duration-200 text-lg block py-1", // Reduced padding
                    activeSection === item.href.replace('#', '') && "text-foreground font-semibold"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

function MobileMenuToggle({ isMenuOpen, setIsMenuOpen }) {
  return (
    <Button 
      size="icon" 
      onClick={() => setIsMenuOpen(!isMenuOpen)} 
      className="md:hidden"
    >
      {isMenuOpen ? (
        <X className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Menu className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  )
}

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
    </Button>
  )
}
