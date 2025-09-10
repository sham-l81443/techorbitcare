import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import { ScreenRepair, BatteryRepair, WaterDamageRepair } from '@/assets/images';
import StructuredData from '@/components/structured-data';

export const metadata: Metadata = {
  title: "Best Mobile Repair Shop Court Road Taliparamba | Phone Repair Near Police Station",
  description: "Best mobile repair shop Court Road Taliparamba. Phone repair shop near Police Station Taliparamba. Mobile service center Court Road Taliparamba. Smartphone service center near Police Station Taliparamba. Emergency mobile repair Court Taliparamba. 24x7 mobile repair Court Road Taliparamba.",
  keywords: "best mobile repair shop Court Taliparamba, phone repair shop near Police Station Taliparamba, mobile service center Court Road Taliparamba, smartphone service center near Police Station Taliparamba, emergency mobile repair Court Taliparamba, urgent phone repair near Police Station Taliparamba, 24x7 mobile repair Court Road Taliparamba, doorstep phone repair Court Taliparamba, trusted mobile repair shop Court Taliparamba, mobile repair Court Road Taliparamba, phone repair Court Junction Taliparamba, smartphone repair near Police Station Court Taliparamba",
  openGraph: {
    title: "Best Mobile Repair Shop Court Road Taliparamba | Phone Repair Near Police Station",
    description: "Best mobile repair shop Court Road Taliparamba. Phone repair shop near Police Station Taliparamba. Mobile service center Court Road Taliparamba with same-day service.",
    type: "website",
    locale: "en_IN",
    url: "https://techorbitcare.com/mobile-repair-court-road-taliparamba",
    images: [
      {
        url: "https://techorbitcare.com/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Best Mobile Repair Shop Court Road Taliparamba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Mobile Repair Shop Court Road Taliparamba",
    description: "Best mobile repair shop Court Road Taliparamba. Phone repair shop near Police Station Taliparamba. Mobile service center Court Road Taliparamba.",
    images: ["https://techorbitcare.com/icons/icon-512x512.png"],
  },
  alternates: {
    canonical: "https://techorbitcare.com/mobile-repair-court-road-taliparamba",
  },
};

const locationSchema = {
  "@context": "https://schema.org",
  "@type": "MobilePhoneRepairShop",
  "name": "TechOrbitCare - Best Mobile Repair Shop Court Road Taliparamba",
  "description": "Best mobile repair shop Court Road Taliparamba. Phone repair shop near Police Station Taliparamba. Mobile service center Court Road Taliparamba.",
  "url": "https://techorbitcare.com/mobile-repair-court-road-taliparamba",
  "telephone": "+919020554466",
  "email": "techorbitcare@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Police Station, Court Road",
    "addressLocality": "Taliparamba",
    "addressRegion": "Kerala",
    "postalCode": "670141",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.0376313",
    "longitude": "75.3624648"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "₹999-₹4999",
  "paymentAccepted": ["Cash", "Credit Card", "UPI", "Net Banking"],
  "currenciesAccepted": "INR",
  "areaServed": [
    {
      "@type": "City",
      "name": "Taliparamba"
    },
    {
      "@type": "City", 
      "name": "Kannur"
    },
    {
      "@type": "City",
      "name": "Payyanur"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "12.0376313",
      "longitude": "75.3624648"
    },
    "geoRadius": "50000"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1200",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
  ],
  "image": "https://techorbitcare.com/icons/icon-512x512.png",
  "logo": "https://techorbitcare.com/icons/icon-192x192.png"
};

const services = [
  {
    title: "Screen Replacement Court Taliparamba",
    description: "Broken mobile screen repair Court Taliparamba. Cracked phone display replacement near Police Station Taliparamba.",
    price: "From ₹2,999",
    image: ScreenRepair,
    features: ["Same-day service", "Original parts", "Warranty included"]
  },
  {
    title: "Battery Replacement Court Road Taliparamba",
    description: "Phone fast charging repair Court Taliparamba. Mobile not charging repair near Police Station Taliparamba.",
    price: "From ₹1,999",
    image: BatteryRepair,
    features: ["Quick repair", "Original batteries", "6-month warranty"]
  },
  {
    title: "Water Damage Repair Court Taliparamba",
    description: "Mobile water damage repair Court Taliparamba. Phone liquid damage repair near Police Station Taliparamba.",
    price: "From ₹3,999",
    image: WaterDamageRepair,
    features: ["Emergency service", "Data recovery", "Professional cleaning"]
  }
];

const whyChooseUs = [
  "15+ years experience in mobile repair",
  "Same-day repair service available",
  "Original parts with warranty",
  "Expert technicians with certification",
  "Competitive pricing",
  "Located near Police Station Court Taliparamba",
  "Emergency repair service",
  "All smartphone brands supported"
];

const brands = [
  "iPhone Repair Court Taliparamba",
  "Samsung Mobile Repair Court Road Taliparamba",
  "Oppo Phone Repair Court Taliparamba",
  "Vivo Smartphone Repair Near Police Station Taliparamba",
  "Realme Mobile Repair Court Taliparamba",
  "Redmi Phone Repair Court Road Taliparamba",
  "OnePlus Mobile Repair Court Taliparamba",
  "Motorola Phone Repair Near Police Station Taliparamba",
  "Nokia Mobile Repair Court Taliparamba"
];

export default function MobileRepairCourtRoadTaliparambaPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData type="localBusiness" data={locationSchema} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best Mobile Repair Shop Court Road Taliparamba
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Phone repair shop near Police Station Taliparamba. Mobile service center Court Road Taliparamba. 
              Smartphone service center near Police Station Taliparamba with same-day repair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Book Repair Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Call +91 9020554466
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-gray-700">Near Police Station, Court Road, Taliparamba</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-gray-700">Mon-Fri: 8AM-8PM, Sat: 9AM-6PM, Sun: 10AM-5PM</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600 mr-2" />
                <span className="text-gray-700">+91 9020554466</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* About Section */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trusted Mobile Repair Service Court Road Taliparamba
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                TechOrbitCare is the most trusted mobile repair shop in Court Road Taliparamba. 
                Located near Police Station Court Taliparamba, we provide professional smartphone repair, 
                screen replacement, battery repair, and water damage recovery services. With 15+ years of 
                experience, we are the best choice for all your mobile repair needs.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{service.price}</p>
                  <ul className="space-y-1 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Book This Service</Button>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Why Choose TechOrbitCare Court Road Taliparamba?
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Services */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Brand-Specific Repair Services Court Taliparamba
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {brands.map((brand, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{brand}</h4>
                    <p className="text-gray-600 text-sm">
                      Professional repair service for all models. Screen replacement, battery repair, 
                      water damage recovery, and software issues.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Customer Reviews Court Road Taliparamba
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">5.0</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    &ldquo;Excellent service! Fixed my iPhone screen quickly and professionally. 
                    Best mobile repair shop in Court Road Taliparamba.&rdquo;
                  </p>
                  <p className="font-semibold text-gray-900">- Rajesh Kumar</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">5.0</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    &ldquo;Great service! They fixed my Samsung charging port issue same day. 
                    Highly recommended for mobile repairs near Police Station Taliparamba.&rdquo;
                  </p>
                  <p className="font-semibold text-gray-900">- Priya Nair</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">5.0</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    &ldquo;Professional water damage repair service. They recovered my phone data 
                    and fixed the device completely. Trusted mobile repair shop Court Taliparamba.&rdquo;
                  </p>
                  <p className="font-semibold text-gray-900">- Suresh Menon</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gray-900 text-white rounded-2xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Need Mobile Repair Service Court Road Taliparamba?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Contact us now for professional mobile repair service in Court Road Taliparamba. 
                Same-day service available for most repairs!
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
