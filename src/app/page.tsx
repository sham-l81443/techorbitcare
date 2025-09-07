import Navbar from "@/components/layout/navbar";
import Hero from "./_home/hero";
import VisitStore from "./_home/visit-store";

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden -z-50">
      <Navbar />
      <main id="main-content" className="flex-1 overflow-auto z-10 " role="main">
        <Hero />
        <VisitStore />
      </main>
    </div>
  );
}
