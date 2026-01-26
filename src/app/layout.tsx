import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "247GBS Digital Expo | A Global Digital Exhibition That Never Closes",
  description: "Where businesses, customers, rewards, and networks connect in one living ecosystem. Join the permanent digital business exhibition — open 24/7, worldwide.",
  keywords: ["digital expo", "business exhibition", "rewards", "network marketing", "digital wallet", "business growth"],
  openGraph: {
    title: "247GBS Digital Expo",
    description: "A Global Digital Exhibition That Never Closes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
