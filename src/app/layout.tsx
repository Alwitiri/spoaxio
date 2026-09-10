import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TurfTexture from "@/components/TurfTexture";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spoaxio",
  description: "Your sports platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <TurfTexture />
      </body>
    </html>
  );
}
