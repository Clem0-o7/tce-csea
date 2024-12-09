import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme(); // Access system theme as fallback

  // Ensure theme applies correctly on initial load
  useEffect(() => {
    const root = document.documentElement;

    // Apply "dark" class based on current theme or system preference
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, systemTheme]);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <header
      className="flex items-center justify-between p-4"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo/logo.webp" alt="Logo" width={50} height={50} />
      </div>

      {/* Navbar links for larger screens */}
      <nav className="hidden md:flex flex-1 justify-center space-x-4">
        <Link href="/" className="btn-nav">Home</Link>
        <Link href="/about" className="btn-nav">About</Link>
        <Link href="/events" className="btn-nav">Events</Link>
        <Link href="/winners" className="btn-nav">Winners</Link>
        <Link href="/gallery" className="btn-nav">Gallery</Link>
      </nav>

      {/* Dark mode toggle */}
      <div className="flex items-center space-x-2">
        <ModeToggle />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center space-x-4">
        <Button onClick={handleToggle} variant="outline" className="dark:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      )}
    </header>
  );
}

// Mode Toggle Component
function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative dark:text-white"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
