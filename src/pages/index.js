import { Navbar } from "@/components/Navbar"; // Import your Navbar component
import { Button } from "@/components/ui/button"; // Import button or any other components if needed

export default function Home() {
  return (
    <div>
      <Navbar />  {/* Render Navbar at the top */}

      {/* Sections for each page */}
      <section id="home" className="min-h-screen bg-blue-100 flex items-center justify-center">
        <h2 className="text-3xl font-bold">Home Section</h2>
      </section>

      <section id="about" className="min-h-screen bg-green-100 flex items-center justify-center">
        <h2 className="text-3xl font-bold">About Section</h2>
      </section>

      <section id="events" className="min-h-screen bg-red-100 flex items-center justify-center">
        <h2 className="text-3xl font-bold">Events Section</h2>
      </section>

      <section id="winners" className="min-h-screen bg-yellow-100 flex items-center justify-center">
        <h2 className="text-3xl font-bold">Winners Section</h2>
      </section>

      <section id="gallery" className="min-h-screen bg-purple-100 flex items-center justify-center">
        <h2 className="text-3xl font-bold">Gallery Section</h2>
      </section>
    </div>
  );
}
