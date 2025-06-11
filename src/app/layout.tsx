import type { Metadata } from "next";
import { Bungee_Shade, Lobster, Roboto_Mono } from "next/font/google";
import "./globals.css";
// 1. Import our new AuthProvider
import { AuthProvider } from "@/contexts/AuthContext";

const bungeeShade = Bungee_Shade({ subsets: ["latin"], weight: ["400"], variable: '--font-bungee-shade' });
const lobster = Lobster({ subsets: ["latin"], weight: ["400"], variable: '--font-lobster' });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-roboto-mono' });

export const metadata: Metadata = {
  title: "OnePizza.wtf",
  description: "Trade skills for slices.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className={`${bungeeShade.variable} ${lobster.variable} ${robotoMono.variable}`}>
      <body className="font-sans">
        {/* 2. Wrap the children in the AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}