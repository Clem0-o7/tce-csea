// pages/events.js
import Navbar from "@/components/Navbar";

export default function Events() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted p-4">
        <h1 className="text-3xl font-bold">Events Page</h1>
        <p>This is the Events page. Scroll to test the Navbar.</p>
      </div>
    </>
  );
}
