import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Current theme:", theme);
    console.log("HTML class:", document.documentElement.className);
  }, [theme]);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen  flex flex-col justify-center items-center py-16">
        <h1 className="text-4xl font-bold text-primary">Welcome to CSEA Website!</h1>
        <p className="text-lg mt-4">
          Computer Science and Engineering Association
        </p>
      </main>
    </div>
  );
}
