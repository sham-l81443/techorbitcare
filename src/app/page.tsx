import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-16 flex-1 overflow-auto" role="main">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to TechOrbitCare
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional mobile phone repair services in Taliparamba, Kerala. 15+ years of experience repairing smartphones, keypad phones, and all mobile devices.
          </p>
        </div>
      </main>
    </div>
  );
}
