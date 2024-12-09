// pages/gallery.js
import Navbar from "@/components/Navbar";

export default function Gallery() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary p-4">
        <h1 className="text-3xl font-bold">Gallery Page</h1>
        <p>This is the Gallery page. Scroll to test the theme toggle functionality!</p>
      </div>
    </>
  );
}
