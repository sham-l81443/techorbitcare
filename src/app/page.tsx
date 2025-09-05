import Navbar from "@/components/layout/navbar";
import Hero from "./_home/hero";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main id="main-content" className="flex-1 overflow-auto" role="main">
        <Hero />
      </main>
    </div>
  );
}
