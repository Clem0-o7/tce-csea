// pages/about.js
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary p-4">
        <h1 className="text-3xl font-bold">About Page</h1>
        <p>This is the About page. You can test theme switching here.</p>
      </div>
    </>
  );
}
