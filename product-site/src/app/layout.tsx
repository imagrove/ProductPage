import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SnipcartProvider from "@/components/SnipcartProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CartSummary from "@/components/CartSummary";
import TinaProvider from "@/components/TinaProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Product Store - Quality Products for You",
    template: "%s | Product Store"
  },
  description: "Discover quality products with excellent customer service. Shop now and enjoy fast shipping worldwide with secure payment options including Alipay.",
  keywords: ["online store", "quality products", "fast shipping", "secure payment", "Alipay", "electronics", "gadgets"],
  authors: [{ name: "Product Store Team" }],
  creator: "Product Store",
  publisher: "Product Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Product Store - Quality Products for You",
    description: "Discover quality products with excellent customer service. Shop now and enjoy fast shipping worldwide.",
    url: "/",
    siteName: "Product Store",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Product Store - Quality Products",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Store - Quality Products for You",
    description: "Discover quality products with excellent customer service. Shop now and enjoy fast shipping worldwide.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TinaProvider>
          <SnipcartProvider>
            <GoogleAnalytics />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CartSummary />
          </SnipcartProvider>
        </TinaProvider>
      </body>
    </html>
  );
}
