import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const poppins = Poppins({
  weight: ["300", "400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const caveat = Caveat({
  weight: "400",
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yours Digitally - Postcards",
  description:
    "Receive a digital postcard from Croatia - Yours digitally, Central Dalmatia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${caveat.variable} antialiased`}>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
