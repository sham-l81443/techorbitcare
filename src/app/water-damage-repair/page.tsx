import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Droplets } from 'lucide-react';
import Image from 'next/image';
import { WaterDamageRepair } from '@/assets/images';
import StructuredData from '@/components/structured-data';

export const metadata: Metadata = {
  title: "Mobile Water Damage Repair Court Taliparamba | Phone Liquid Damage Repair Near Police Station",
  description: "Professional mobile water damage repair Court Taliparamba. Phone liquid damage repair near Police Station Taliparamba. Smartphone dead phone service Court Taliparamba. Quick water damage recovery Court Road Taliparamba with warranty.",
  keywords: "mobile water damage repair Court Taliparamba, phone liquid damage repair near Police Station Taliparamba, smartphone dead phone service Court Taliparamba, quick water damage recovery Court Road Taliparamba, emergency mobile repair near Police Station Taliparamba, instant dead phone repair Court Taliparamba, iPhone water damage repair Court Taliparamba, Samsung water damage repair Court Road Taliparamba, Oppo water damage repair Court Taliparamba, Vivo water damage repair near Police Station Taliparamba, Realme water damage repair Court Taliparamba, Redmi water damage repair Court Road Taliparamba, OnePlus water damage repair Court Taliparamba, Motorola water damage repair near Police Station Taliparamba, Nokia water damage repair Court Taliparamba",
  openGraph: {
    title: "Mobile Water Damage Repair Court Taliparamba | Phone Liquid Damage Repair",
    description: "Professional mobile water damage repair Court Taliparamba. Phone liquid damage repair near Police Station Taliparamba. Quick water damage recovery with warranty.",
    type: "website",
    locale: "en_IN",
    url: "https://techorbitcare.com/water-damage-repair",
    images: [
      {
        url: "https://techorbitcare.com/assets/images/water-damage-repair.jpg",
        width: 800,
        height: 600,
        alt: "Mobile Water Damage Repair Court Taliparamba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Water Damage Repair Court Taliparamba",
    description: "Professional mobile water damage repair Court Taliparamba. Phone liquid damage repair near Police Station Taliparamba.",
    images: ["https://techorbitcare.com/assets/images/water-damage-repair.jpg"],
  },
  alternates: {
    canonical: "https://techorbitcare.com/water-damage-repair",
  },
};

const waterDamageRepairSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile Water Damage Repair Service Court Taliparamba",
  "description": "Professional mobile water damage repair Court Taliparamba. Phone liquid damage repair near Police Station Taliparamba.",
  "provider": {
    "@type": "MobilePhoneRepairShop",
    "name": "TechOrbitCare",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Police Station, Court Road",
      "addressLocality": "Taliparamba",
      "addressRegion": "Kerala",
      "postalCode": "670141",
      "addressCountry": "IN"
    },
    "telephone": "+919020554466"
  },
  "areaServed": {
    "@type": "City",
    "name": "Taliparamba"
  },
  "offers": {
    "@type": "Offer",
    "price": "3999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "description": "Mobile water damage repair with warranty"
  }
};

const features = [
  "Emergency water damage repair service",
  "Professional cleaning and drying process",
  "Component-level repair and replacement",
  "Data recovery from water-damaged devices",
  "All smartphone brands supported",
  "Quick turnaround time with warranty"
];

const waterDamageTypes = [
  "Phone dropped in water",
  "Liquid spilled on phone",
  "Phone exposed to rain",
  "Bathroom steam damage",
  "Pool water damage",
  "Coffee/tea spill damage",
  "Toilet water damage",
  "Washing machine damage"
];

const brands = [
  "iPhone Water Damage Repair Court Taliparamba",
  "Samsung Water Damage Repair Court Road Taliparamba", 
  "Oppo Water Damage Repair Court Taliparamba",
  "Vivo Water Damage Repair Near Police Station Taliparamba",
  "Realme Water Damage Repair Court Taliparamba",
  "Redmi Water Damage Repair Court Road Taliparamba",
  "OnePlus Water Damage Repair Court Taliparamba",
  "Motorola Water Damage Repair Near Police Station Taliparamba",
  "Nokia Water Damage Repair Court Taliparamba"
];

export default function WaterDamageRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData type="service" data={waterDamageRepairSchema} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mobile Water Damage Repair Court Taliparamba
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Phone liquid damage repair near Police Station Taliparamba. 
              Smartphone dead phone service Court Taliparamba. Quick water damage recovery Court Road Taliparamba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Emergency Water Damage Repair
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Call +91 9020554466
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Droplets className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Emergency Water Damage:</strong> If your phone just got wet, turn it off immediately and bring it to us ASAP. 
                The faster we can start the repair process, the better the chances of recovery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Professional Water Damage Repair Service Court Road Taliparamba
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Did your phone get wet or damaged by liquid? Don&apos;t panic! 
                  Our expert technicians at TechOrbitCare provide professional water damage repair 
                  services in Court Road Taliparamba. We specialize in recovering water-damaged devices 
                  and restoring them to working condition.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Located near Police Station Court Taliparamba, we are the most trusted 
                  mobile repair shop for water damage recovery. Our skilled technicians use 
                  advanced equipment and techniques to clean and repair water-damaged devices.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Image
                  src={WaterDamageRepair}
                  alt="Mobile Water Damage Repair Court Taliparamba"
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>

            {/* Water Damage Types */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Types of Water Damage We Repair Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {waterDamageTypes.map((type, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{type}</h4>
                    <p className="text-gray-600 text-sm">
                      Professional cleaning and repair service available.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Repair Process */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Water Damage Repair Process Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Immediate Assessment</h4>
                  <p className="text-gray-600">Quick diagnosis of water damage extent and affected components.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Disassembly & Cleaning</h4>
                  <p className="text-gray-600">Complete disassembly and professional cleaning of all components.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Component Repair</h4>
                  <p className="text-gray-600">Repair or replace damaged components as needed.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">4</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Testing & Warranty</h4>
                  <p className="text-gray-600">Thorough testing and 3-month warranty on repairs.</p>
                </div>
              </div>
            </div>

            {/* Brand-Specific Services */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Brand-Specific Water Damage Repair Services Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {brands.map((brand, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{brand}</h4>
                    <p className="text-gray-600 text-sm">
                      Professional water damage repair service for all models. 
                      Data recovery and component repair available.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Water Damage Repair Pricing Court Road Taliparamba
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Basic Repair</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹3,999</p>
                  <p className="text-gray-600 text-sm">Minor water damage</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Standard Repair</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹5,999</p>
                  <p className="text-gray-600 text-sm">Moderate water damage</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Advanced Repair</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹7,999</p>
                  <p className="text-gray-600 text-sm">Severe water damage</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Recovery</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹2,999</p>
                  <p className="text-gray-600 text-sm">Data recovery service</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gray-900 text-white rounded-2xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Phone Got Wet? Don&apos;t Wait!
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Contact us immediately for emergency water damage repair service in Court Road Taliparamba. 
                Time is critical for water damage recovery!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Emergency Repair Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Call +91 9020554466
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
