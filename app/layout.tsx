import type { Metadata, Viewport } from "next";
import { Caveat, Nunito_Sans, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin", "arabic"], variable: "--font-rubik", display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: "Daftar · The smart notebook for Egypt's local shops",
  description:
    "Shopkeepers write entries the way they write in their paper daftar, in Egyptian Arabic or Franco. AI organizes them, tracks every sale, and sends friendly WhatsApp reminders.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1D2B3A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rubik.variable} ${nunito.variable} ${caveat.variable}`}>
      <body className="font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
