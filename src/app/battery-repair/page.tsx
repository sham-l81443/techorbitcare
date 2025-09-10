import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, Shield, Wrench, Battery } from 'lucide-react';
import Image from 'next/image';
import { BatteryRepair } from '@/assets/images';
import StructuredData from '@/components/structured-data';

export const metadata: Metadata = {
  title: "Phone Fast Charging Repair Court Taliparamba | Mobile Not Charging Repair Near Police Station",
  description: "Professional phone fast charging repair Court Taliparamba. Mobile not charging repair near Police Station Taliparamba. Smartphone battery swelling issue Court Taliparamba. Original mobile battery replacement Court Road Taliparamba with warranty.",
  keywords: "phone fast charging repair Court Taliparamba, mobile not charging repair near Police Station Taliparamba, smartphone battery swelling issue Court Taliparamba, original mobile battery replacement Court Road Taliparamba, phone charging IC problem fix Taliparamba Court, mobile charging port loose repair Court Taliparamba, phone battery backup problem fix near Police Station Taliparamba, quick mobile charging repair Court Taliparamba, iPhone battery replacement Court Taliparamba, Samsung battery repair Court Road Taliparamba, Oppo battery replacement Court Taliparamba, Vivo battery repair near Police Station Taliparamba, Realme battery replacement Court Taliparamba, Redmi battery repair Court Road Taliparamba, OnePlus battery replacement Court Taliparamba, Motorola battery repair near Police Station Taliparamba, Nokia battery replacement Court Taliparamba",
  openGraph: {
    title: "Phone Fast Charging Repair Court Taliparamba | Mobile Battery Replacement",
    description: "Professional phone fast charging repair Court Taliparamba. Mobile not charging repair near Police Station Taliparamba. Original battery replacement with warranty.",
    type: "website",
    locale: "en_IN",
    url: "https://techorbitcare.com/battery-repair",
    images: [
      {
        url: "https://techorbitcare.com/assets/images/battery-repair.jpg",
        width: 800,
        height: 600,
        alt: "Mobile Battery Repair Court Taliparamba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Fast Charging Repair Court Taliparamba",
    description: "Professional phone fast charging repair Court Taliparamba. Mobile not charging repair near Police Station Taliparamba.",
    images: ["https://techorbitcare.com/assets/images/battery-repair.jpg"],
  },
  alternates: {
    canonical: "https://techorbitcare.com/battery-repair",
  },
};

const batteryRepairSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile Battery Repair Service Court Taliparamba",
  "description": "Professional phone fast charging repair Court Taliparamba. Mobile not charging repair near Police Station Taliparamba.",
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
    "price": "1999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "description": "Mobile battery replacement with warranty"
  }
};

const features = [
  "Original battery replacement with warranty",
  "Fast charging port repair and replacement",
  "Battery swelling issue diagnosis and repair",
  "Charging IC problem fix and replacement",
  "All smartphone brands supported",
  "Same-day battery replacement service"
];

const batteryIssues = [
  "Phone not charging properly",
  "Battery drains quickly",
  "Phone shuts down unexpectedly",
  "Battery swelling or bulging",
  "Charging port loose or damaged",
  "Fast charging not working",
  "Battery backup problems",
  "Charging IC issues"
];

const brands = [
  "iPhone Battery Replacement Court Taliparamba",
  "Samsung Battery Repair Court Road Taliparamba", 
  "Oppo Battery Replacement Court Taliparamba",
  "Vivo Battery Repair Near Police Station Taliparamba",
  "Realme Battery Replacement Court Taliparamba",
  "Redmi Battery Repair Court Road Taliparamba",
  "OnePlus Battery Replacement Court Taliparamba",
  "Motorola Battery Repair Near Police Station Taliparamba",
  "Nokia Battery Replacement Court Taliparamba"
];

export default function BatteryRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData type="service" data={batteryRepairSchema} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center text-green-200 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Phone Fast Charging Repair Court Taliparamba
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Mobile not charging repair near Police Station Taliparamba. 
              Smartphone battery swelling issue Court Taliparamba. Original mobile battery replacement Court Road Taliparamba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Book Battery Repair Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Call +91 9020554466
              </Button>
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
                  Professional Battery Repair Service Court Road Taliparamba
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Is your phone not charging properly or battery draining too fast? 
                  Our expert technicians at TechOrbitCare provide professional battery repair 
                  services in Court Road Taliparamba. We fix all battery-related issues including 
                  charging problems, battery swelling, and charging port issues.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Located near Police Station Court Taliparamba, we are the most trusted 
                  mobile repair shop for battery replacement. Our skilled technicians use only 
                  original and high-quality batteries to ensure your device works perfectly.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Image
                  src={BatteryRepair}
                  alt="Mobile Battery Repair Court Taliparamba"
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>

            {/* Battery Issues */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Common Battery Issues We Fix Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {batteryIssues.map((issue, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <Battery className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{issue}</h4>
                    <p className="text-gray-600 text-sm">
                      Professional diagnosis and repair service available.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-green-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Choose Our Battery Repair Service Court Taliparamba?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Quick Service</h4>
                  <p className="text-gray-600">Most battery repairs completed within 1-2 hours. Emergency repairs available.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Warranty Included</h4>
                  <p className="text-gray-600">All battery replacements come with 6-month warranty on parts and labor.</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Wrench className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Expert Technicians</h4>
                  <p className="text-gray-600">15+ years experience in mobile repair. Certified and trained professionals.</p>
                </div>
              </div>
            </div>

            {/* Brand-Specific Services */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Brand-Specific Battery Repair Services Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {brands.map((brand, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{brand}</h4>
                    <p className="text-gray-600 text-sm">
                      Professional battery replacement service for all models. 
                      Original batteries with warranty.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Battery Repair Pricing Court Road Taliparamba
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Basic Battery</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹1,999</p>
                  <p className="text-gray-600 text-sm">Entry-level smartphones</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mid-Range Battery</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹2,999</p>
                  <p className="text-gray-600 text-sm">Popular smartphone models</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Battery</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹4,999</p>
                  <p className="text-gray-600 text-sm">Flagship smartphones</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">iPhone Battery</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹5,999</p>
                  <p className="text-gray-600 text-sm">All iPhone models</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gray-900 text-white rounded-2xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Fix Your Battery Issues?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Contact us now for professional battery repair service in Court Road Taliparamba. 
                Same-day service available!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Book Repair Now
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
