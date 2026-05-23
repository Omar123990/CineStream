import type { Metadata } from "next";
import { Spline_Sans, Inter } from "next/font/google";
import QueryProvider from "../../providers/QueryProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "CineStream | Watch Movies & TV Shows",
    template: "%s | CineStream",
  },
  description: "Experience electric luxury streaming with CineStream. Watch the latest movies and TV shows in HD.",
  keywords: ["streaming", "movies", "tv shows", "cinema", "CineStream"],
  authors: [{ name: "Omar Abdelglil" }],
  openGraph: {
    title: "CineStream - Electric Luxury Streaming",
    description: "Stream your favorite movies now.",
    url: "https://cine-stream-rosy-phi.vercel.app/",
    siteName: "CineStream",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineStream",
    description: "Watch the latest movies in HD.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${splineSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-[#16111B] text-white min-h-full flex flex-col selection:bg-[#B76DFF] selection:text-white">
        <Navbar />
        <main className="grow pt-28">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}