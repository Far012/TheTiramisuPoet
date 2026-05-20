import React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

// Load Cormorant Garamond for elegant serif headlines
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Load Plus Jakarta Sans for modern clean body text and UI
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thetiramisupoet.de"),
  title: "The Tiramisu Poet | Premium Tiramisu & Dessert Experiences",
  description: "Handcrafted tiramisu creations, elegant dessert towers, and patisserie experiences for weddings, corporate events, and special moments.",
  keywords: "premium tiramisu, tiramisu catering, wedding dessert catering, tiramisu cups, dessert catering, custom tiramisu, tiramisu tower",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "The Tiramisu Poet | Premium Tiramisu & Dessert Experiences",
    description: "Handcrafted tiramisu creations, elegant dessert towers, and patisserie experiences for weddings, corporate events, and special moments.",
    url: "https://thetiramisupoet.de",
    siteName: "The Tiramisu Poet",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "The Tiramisu Poet Premium Dessert Branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tiramisu Poet | Premium Tiramisu & Dessert Experiences",
    description: "Handcrafted tiramisu creations, elegant dessert towers, and patisserie experiences for weddings, corporate events, and special moments.",
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <CartProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <CartDrawer />
            <Toast />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
