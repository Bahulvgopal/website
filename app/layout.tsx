import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Preloader from "@/components/Preloader";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Use the detailed SEO from the 1st one + the professional template from the 2nd
  title: {
    default: "Legacy IEDC UCEK | Innovation & Entrepreneurship Cell",
    template: "%s | Legacy IEDC",
  },
  description: "Official website of Legacy IEDC UCEK, the Innovation and Entrepreneurship Development Cell of University College of Engineering, Kariavattom.",
  keywords: "Legacy IEDC UCEK, UCEK, IEDC, ksum, University college of engineering Kariavattom, engineering in trivandrum, keam",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Legacy IEDC - Innovation & Entrepreneurship Cell",
    description: "Explore upcoming events like Failure Fridays and startup programs at UCEK.",
    url: "https://iedc.uck.ac.in/", // Double check if it's .uck.ac.in or ucek
    siteName: "Legacy IEDC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black text-white flex flex-col min-h-screen`}>
        <Preloader />
        <Navbar />

        {/* pt-24 ensures content doesn't hide under a fixed Navbar */}
        <main className="pt-24 flex-grow">
          {children}
        </main>

        <Footer />
        
        {/* Keep your analytics from the 1st version */}
        <GoogleAnalytics gaId="G-F5Y4P1CMWN" />
      </body>
    </html>
  );
}