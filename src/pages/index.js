import { Navbar } from "@/components/Navbar"; // Import your Navbar component
import { Button } from "@/components/ui/button"; // Import button or any other components if needed
import { motion } from "framer-motion"; // Import Framer Motion

export default function Home() {
  return (
    <div>
      <Navbar />  {/* Render Navbar at the top */}

      {/* Add padding to the top of the content to prevent it from being hidden behind the navbar */}
      <div className="pt-20">
        {/* Sections for each page */}
        <motion.section
          id="home"
          className="min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/top/tce-bg.jpg')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">Home Section</h2>
        </motion.section>

        <motion.section
          id="about"
          className="min-h-screen bg-green-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">About Section</h2>
        </motion.section>

        <motion.section
          id="events"
          className="min-h-screen bg-red-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">Events Section</h2>
        </motion.section>

        <motion.section
          id="winners"
          className="min-h-screen bg-yellow-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">Winners Section</h2>
        </motion.section>

        <motion.section
          id="gallery"
          className="min-h-screen bg-purple-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">Gallery Section</h2>
        </motion.section>
      </div>
    </div>
  );
}
