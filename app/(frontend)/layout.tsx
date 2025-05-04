import type { Metadata } from "next";
import { Poppins, Reenie_Beanie } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const poppins = Poppins({
  weight: ["300", "400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const reenieBeanie = Reenie_Beanie({
  weight: "400",
  variable: "--font-reenie-beanie",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your's Digitally - Razglednice",
  description:
    "Pošaljite vašu omiljenu razglednicu u digitalnom obliku. - Your's Digitally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${reenieBeanie.variable} antialiased`}
      >
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
