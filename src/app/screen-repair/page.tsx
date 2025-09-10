import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, Shield, Wrench } from 'lucide-react';
import Image from 'next/image';
import { ScreenRepair } from '@/assets/images';
import StructuredData from '@/components/structured-data';

export const metadata: Metadata = {
  title: "Broken Mobile Screen Repair Court Taliparamba | Cracked Phone Display Replacement Near Police Station",
  description: "Professional broken mobile screen repair Court Taliparamba. Cracked phone display replacement near Police Station Taliparamba. Shattered smartphone glass repair Court Road Taliparamba with warranty. Same day mobile screen replacement Court Taliparamba.",
  keywords: "broken mobile screen repair Court Taliparamba, cracked phone display replacement near Police Station Taliparamba, shattered smartphone glass repair Court Road Taliparamba, mobile screen replacement with warranty Court Taliparamba, cheap phone screen repair Court Taliparamba, original smartphone display replacement Court Road Taliparamba, mobile touch not working repair Court Taliparamba, phone display not working near Police Station Taliparamba, same day mobile screen replacement Court Taliparamba, iPhone screen replacement Court Taliparamba, Samsung screen repair Court Road Taliparamba, Oppo display replacement Court Taliparamba, Vivo screen repair near Police Station Taliparamba, Realme cracked screen replacement Court Taliparamba, Redmi display repair Court Road Taliparamba, OnePlus screen replacement Court Taliparamba, Motorola display repair near Police Station Taliparamba, Nokia screen repair Court Taliparamba",
  openGraph: {
    title: "Broken Mobile Screen Repair Court Taliparamba | Cracked Phone Display Replacement",
    description: "Professional broken mobile screen repair Court Taliparamba. Cracked phone display replacement near Police Station Taliparamba. Same day service with warranty.",
    type: "website",
    locale: "en_IN",
    url: "https://techorbitcare.com/screen-repair",
    images: [
      {
        url: "https://techorbitcare.com/assets/images/screen-repair.jpg",
        width: 800,
        height: 600,
        alt: "Mobile Screen Repair Court Taliparamba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Broken Mobile Screen Repair Court Taliparamba",
    description: "Professional broken mobile screen repair Court Taliparamba. Cracked phone display replacement near Police Station Taliparamba.",
    images: ["https://techorbitcare.com/assets/images/screen-repair.jpg"],
  },
  alternates: {
    canonical: "https://techorbitcare.com/screen-repair",
  },
};

const screenRepairSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile Screen Repair Service Court Taliparamba",
  "description": "Professional broken mobile screen repair Court Taliparamba. Cracked phone display replacement near Police Station Taliparamba.",
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
    "price": "2999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "description": "Mobile screen replacement with warranty"
  }
};

const features = [
  "Same-day screen replacement service",
  "Original and high-quality replacement screens",
  "Professional installation with warranty",
  "All smartphone brands supported",
  "Competitive pricing starting from ₹2,999",
  "Expert technicians with 15+ years experience"
];

const brands = [
  "iPhone Screen Repair Court Taliparamba",
  "Samsung Screen Repair Court Road Taliparamba", 
  "Oppo Display Replacement Court Taliparamba",
  "Vivo Screen Repair Near Police Station Taliparamba",
  "Realme Cracked Screen Replacement Court Taliparamba",
  "Redmi Display Repair Court Road Taliparamba",
  "OnePlus Screen Replacement Court Taliparamba",
  "Motorola Display Repair Near Police Station Taliparamba",
  "Nokia Screen Repair Court Taliparamba"
];

export default function ScreenRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData type="service" data={screenRepairSchema} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Broken Mobile Screen Repair Court Taliparamba
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Cracked phone display replacement near Police Station Taliparamba. 
              Shattered smartphone glass repair Court Road Taliparamba with warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Book Screen Repair Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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
                  Professional Screen Replacement Service Court Road Taliparamba
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Is your mobile screen cracked, shattered, or not responding to touch? 
                  Our expert technicians at TechOrbitCare provide professional screen repair 
                  services in Court Road Taliparamba. We specialize in all types of screen 
                  damage and offer same-day repair service.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Located near Police Station Court Taliparamba, we are the most trusted 
                  mobile repair shop in the area. Our skilled technicians use only original 
                  and high-quality replacement screens to ensure your device works perfectly.
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
                  src={ScreenRepair}
                  alt="Mobile Screen Repair Court Taliparamba"
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Choose Our Screen Repair Service Court Taliparamba?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Same-Day Service</h4>
                  <p className="text-gray-600">Most screen repairs completed within 2-4 hours. Emergency repairs available.</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Warranty Included</h4>
                  <p className="text-gray-600">All screen replacements come with 6-month warranty on parts and labor.</p>
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
                Brand-Specific Screen Repair Services Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {brands.map((brand, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{brand}</h4>
                    <p className="text-gray-600 text-sm">
                      Professional screen replacement service for all models. 
                      Original parts with warranty.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Screen Repair Pricing Court Road Taliparamba
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Basic Screen</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹2,999</p>
                  <p className="text-gray-600 text-sm">Entry-level smartphones</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mid-Range Screen</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹4,999</p>
                  <p className="text-gray-600 text-sm">Popular smartphone models</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Screen</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹7,999</p>
                  <p className="text-gray-600 text-sm">Flagship smartphones</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">iPhone Screen</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹9,999</p>
                  <p className="text-gray-600 text-sm">All iPhone models</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gray-900 text-white rounded-2xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Fix Your Broken Screen?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Contact us now for professional screen repair service in Court Road Taliparamba. 
                Same-day service available!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
