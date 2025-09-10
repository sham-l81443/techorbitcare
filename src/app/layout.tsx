import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import PWAStatusIndicator from "@/components/pwa-status-indicator";
import ServiceWorkerRegistration from "@/components/service-worker-registration";

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
  title: "TechOrbitCare - Mobile Phone Repair Shop | Taliparamba, Kerala",
  description: "Professional mobile phone repair services in Taliparamba, Kerala. 15+ years experience repairing smartphones, keypad phones, and all mobile devices. Located near Court Road, Taliparamba.",
  keywords: "mobile phone repair, smartphone repair, phone repair Taliparamba, Kerala mobile repair, TechorbitCare, mobile service center, phone screen repair, mobile repair shop",
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
    title: "TechOrbitCare - Mobile Phone Repair Shop | Taliparamba, Kerala",
    description: "Professional mobile phone repair services in Taliparamba, Kerala. 15+ years experience repairing smartphones, keypad phones, and all mobile devices.",
    type: "website",
    locale: "en_IN",
    siteName: "TechOrbitCare",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechOrbitCare - Mobile Phone Repair Shop",
    description: "Professional mobile phone repair services in Taliparamba, Kerala. 15+ years experience.",
  },
  alternates: {
    canonical: "https://techorbitcare.com",
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
        {children}
        <ServiceWorkerRegistration />
        <PWAStatusIndicator />
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
