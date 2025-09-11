import Navbar from "@/components/layout/navbar";
import Hero from "./_home/hero";
import VisitStore from "./_home/visit-store";
import OurServices from "./_home/services";

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden -z-50">
      <Navbar />
      <main className=" flex-1 overflow-auto z-10" >
        <Hero />
        <OurServices />
        <VisitStore />
      </main>
    </div>
  );
}
