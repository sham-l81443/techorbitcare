import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import StructuredData from "@/components/structured-data";
import GoogleAnalytics from "@/components/google-analytics";
import PerformanceOptimizer from "@/components/performance-optimizer";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechOrbitCare - Best Mobile Repair Shop Court Road Taliparamba | Phone Repair Near Police Station",
  description: "Professional mobile phone repair services in Court Road Taliparamba, Kerala. Expert smartphone repair, screen replacement, battery repair, water damage recovery. Located near Police Station Court Taliparamba. Same-day repair, 15+ years experience.",
  keywords: "mobile repair Court Road Taliparamba, phone repair Court Junction Taliparamba, smartphone repair near Police Station Court Taliparamba, best mobile repair shop Court Taliparamba, phone repair shop near Police Station Taliparamba, mobile service center Court Road Taliparamba, smartphone service center near Police Station Taliparamba, emergency mobile repair Court Taliparamba, urgent phone repair near Police Station Taliparamba, 24x7 mobile repair Court Road Taliparamba, doorstep phone repair Court Taliparamba, trusted mobile repair shop Court Taliparamba, broken mobile screen repair Court Taliparamba, cracked phone display replacement near Police Station Taliparamba, shattered smartphone glass repair Court Road Taliparamba, mobile screen replacement with warranty Court Taliparamba, cheap phone screen repair Court Taliparamba, original smartphone display replacement Court Road Taliparamba, mobile touch not working repair Court Taliparamba, phone display not working near Police Station Taliparamba, same day mobile screen replacement Court Taliparamba, phone fast charging repair Court Taliparamba, mobile not charging repair near Police Station Taliparamba, smartphone battery swelling issue Court Taliparamba, original mobile battery replacement Court Road Taliparamba, phone charging IC problem fix Taliparamba Court, mobile charging port loose repair Court Taliparamba, phone battery backup problem fix near Police Station Taliparamba, quick mobile charging repair Court Taliparamba, mobile software update Court Taliparamba, phone OS installation near Police Station Taliparamba, smartphone flashing unlocking Court Taliparamba, mobile hanging problem repair Court Road Taliparamba, phone virus removal near Police Station Taliparamba, smartphone data recovery Court Taliparamba, phone forgot password unlock Court Road Taliparamba, iPhone software repair Court Taliparamba, Android flashing near Police Station Taliparamba, mobile IC replacement Court Taliparamba, phone motherboard repair near Police Station Taliparamba, smartphone camera replacement Court Taliparamba, phone back glass replacement Court Road Taliparamba, mobile speaker repair near Police Station Taliparamba, phone mic repair Court Taliparamba, smartphone volume button repair Court Road Taliparamba, mobile power button repair near Police Station Taliparamba, phone vibration motor repair Court Taliparamba, smartphone charging IC replacement Court Road Taliparamba, mobile water damage repair Court Taliparamba, phone liquid damage repair near Police Station Taliparamba, smartphone dead phone service Court Taliparamba, quick water damage recovery Court Road Taliparamba, emergency mobile repair near Police Station Taliparamba, instant dead phone repair Court Taliparamba, iPhone repair Court Taliparamba, iPhone screen replacement near Police Station Taliparamba, Samsung mobile charging repair Court Road Taliparamba, Oppo phone battery replacement Court Taliparamba, Vivo smartphone software repair near Police Station Taliparamba, Realme cracked screen replacement Court Taliparamba, Redmi charging port repair Court Road Taliparamba, OnePlus broken display repair near Police Station Taliparamba, Motorola mobile repair Court Taliparamba, Nokia phone repair near Police Station Taliparamba",
  authors: [{ name: "TechOrbitCare" }],
  creator: "TechOrbitCare",
  publisher: "TechOrbitCare",
  robots: "index, follow",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TechOrbitCare",
  },
  openGraph: {
    title: "TechOrbitCare - Best Mobile Repair Shop Court Road Taliparamba | Phone Repair Near Police Station",
    description: "Professional mobile phone repair services in Court Road Taliparamba, Kerala. Expert smartphone repair, screen replacement, battery repair, water damage recovery. Located near Police Station Court Taliparamba.",
    type: "website",
    locale: "en_IN",
    siteName: "TechOrbitCare",
    url: "https://techorbitcare.com",
    images: [
      {
        url: "https://techorbitcare.com/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "TechOrbitCare Mobile Repair Shop Taliparamba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechOrbitCare - Best Mobile Repair Shop Court Road Taliparamba",
    description: "Professional mobile phone repair services in Court Road Taliparamba, Kerala. Expert smartphone repair, screen replacement, battery repair.",
    images: ["https://techorbitcare.com/icons/icon-512x512.png"],
    creator: "@TechOrbitCare",
  },
  alternates: {
    canonical: "https://techorbitcare.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Technology",
  classification: "Mobile Phone Repair Services",
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Taliparamba",
    "geo.position": "12.0376313;75.3624648",
    "ICBM": "12.0376313, 75.3624648",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PerformanceOptimizer />
        <meta name="application-name" content="TechOrbitCare" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TechOrbitCare" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-72x72.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/icon-192x192.png" color="#3b82f6" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://techorbitcare.com" />
        <meta name="twitter:title" content="TechOrbitCare - Mobile Phone Repair Shop" />
        <meta name="twitter:description" content="Professional mobile phone repair services in Taliparamba, Kerala." />
        <meta name="twitter:image" content="https://techorbitcare.com/icons/icon-192x192.png" />
        <meta name="twitter:creator" content="@TechOrbitCare" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TechOrbitCare - Mobile Phone Repair Shop" />
        <meta property="og:description" content="Professional mobile phone repair services in Taliparamba, Kerala." />
        <meta property="og:site_name" content="TechOrbitCare" />
        <meta property="og:url" content="https://techorbitcare.com" />
        <meta property="og:image" content="https://techorbitcare.com/icons/icon-192x192.png" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <QueryProvider>
          <SessionProvider>
            <AuthProvider>
              <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
              <StructuredData type="localBusiness" />
              <StructuredData type="organization" />
              {children}
              <ServiceWorkerRegistration />
              {/* <PWAStatusIndicator /> */}
              <PWAInstallPrompt />
            </AuthProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
