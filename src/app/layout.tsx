import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BottomNav from "./_comp/BottomNav";
import SWRegistration from "./_comp/SWRegistration";
import NetworkGuard from "./_comp/NetworkGuard";

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
  title: "भजनामृत — Bhajan App",
  description: "आत्म विभोर के सूत्र — श्री श्री बाबा श्री जी के 285+ भजनों का संग्रह",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "भजनामृत",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/logo.png",
    icon: "/logo.png",
  },
  other: {
    google: 'notranslate',
  },
};

export const viewport: Viewport = {
  themeColor: "#FF4C4C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Service Worker registration (no-op on server) */}
        <SWRegistration />

        {/* Wraps entire app — shows offline page when disconnected */}
        <NetworkGuard>
          {children}
          <BottomNav />
        </NetworkGuard>
      </body>
    </html>
  );
}
