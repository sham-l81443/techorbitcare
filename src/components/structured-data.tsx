import React from 'react';

interface StructuredDataProps {
  type?: 'localBusiness' | 'service' | 'organization';
  data?: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'localBusiness', data }) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MobilePhoneRepairShop",
    "name": "TechOrbitCare",
    "description": "Professional mobile phone repair services in Court Road Taliparamba, Kerala. Expert smartphone repair, screen replacement, battery repair, water damage recovery.",
    "url": "https://techorbitcare.com",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Phone Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Screen Replacement",
            "description": "Cracked or damaged screens replaced with genuine OEM parts",
            "provider": {
              "@type": "MobilePhoneRepairShop",
              "name": "TechOrbitCare"
            }
          },
          "price": "2999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Battery Replacement",
            "description": "Restore your device's battery life with premium batteries",
            "provider": {
              "@type": "MobilePhoneRepairShop",
              "name": "TechOrbitCare"
            }
          },
          "price": "1999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Damage Repair",
            "description": "Professional water damage restoration and cleaning",
            "provider": {
              "@type": "MobilePhoneRepairShop",
              "name": "TechOrbitCare"
            }
          },
          "price": "3999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Charging Port Repair",
            "description": "Solve charging problems and port connectivity issues",
            "provider": {
              "@type": "MobilePhoneRepairShop",
              "name": "TechOrbitCare"
            }
          },
          "price": "1799",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Issues",
            "description": "OS updates, software bugs, and performance optimization",
            "provider": {
              "@type": "MobilePhoneRepairShop",
              "name": "TechOrbitCare"
            }
          },
          "price": "999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Camera Issues",
            "description": "Fix camera malfunctions, focus issues, and lens problems",
            "provider": {
              "@type": "MobilePhoneRepairShop",
              "name": "TechOrbitCare"
            }
          },
          "price": "2499",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent service! Fixed my iPhone screen quickly and professionally. Highly recommended for mobile repairs in Taliparamba."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Priya Nair"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Best mobile repair shop in Court Road Taliparamba. They fixed my Samsung charging port issue same day. Great service!"
      }
    ],
    "sameAs": [
      "https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
    ],
    "image": "https://techorbitcare.com/icons/icon-512x512.png",
    "logo": "https://techorbitcare.com/icons/icon-192x192.png"
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TechOrbitCare",
    "url": "https://techorbitcare.com",
    "logo": "https://techorbitcare.com/icons/icon-192x192.png",
    "description": "Professional mobile phone repair services in Court Road Taliparamba, Kerala",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Police Station, Court Road",
      "addressLocality": "Taliparamba",
      "addressRegion": "Kerala",
      "postalCode": "670141",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919020554466",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Malayalam", "Hindi"]
    },
    "sameAs": [
      "https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
    ]
  };

  const getSchema = () => {
    switch (type) {
      case 'localBusiness':
        return localBusinessSchema;
      case 'organization':
        return organizationSchema;
      case 'service':
        return data || localBusinessSchema;
      default:
        return localBusinessSchema;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema(), null, 2)
      }}
    />
  );
};

export default StructuredData;
