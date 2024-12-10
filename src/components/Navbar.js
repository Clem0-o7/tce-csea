"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#winners", label: "Winners" },
  { href: "#gallery", label: "Gallery" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState("#home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleNavClick = (href) => {
    setCurrentPage(href)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-background/80 backdrop-blur-md",
        isScrolled || isMenuOpen ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="#top" className="flex items-center space-x-3">
            <Image
              src="/logo/logo.webp"
              alt="Logo"
              width={58}
              height={58}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <span className={`font-semibold text-2xl ${poppins.className} text-foreground`}>CSEA</span>
          </Link>

          <nav className={cn(
            "md:flex md:space-x-4",
            isMobile ? (isMenuOpen ? "flex flex-col items-center space-y-4 absolute top-full left-0 right-0 bg-background py-4 shadow-md" : "hidden") : ""
          )}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-foreground/60 hover:text-foreground transition-colors duration-200",
                  currentPage === item.href && "text-foreground font-semibold"
                )}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

