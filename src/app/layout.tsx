import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
