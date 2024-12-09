// pages/winners.js
import Navbar from "@/components/Navbar";

export default function Winners() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-accent p-4">
        <h1 className="text-3xl font-bold">Winners Page</h1>
        <p>View the winners' list here. Scroll to check out the theme toggle!</p>
      </div>
    </>
  );
}
