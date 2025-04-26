import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AuthProvider } from "@/contexts/auth-context";
import { ReactQueryProviders } from "@/contexts/react-query";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CakeVille",
  description: "Handcrafted Cakes for Every Occasion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ReactQueryProviders>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ReactQueryProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
