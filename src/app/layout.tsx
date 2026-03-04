import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToHome from "@/components/BackToHome";
import LayoutContent from "@/components/LayoutContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bridge — Благотворительная платформа",
  description: "Мы действуем вместе и меняем жизни с нашим сообществом",
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
        <BackToHome />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
