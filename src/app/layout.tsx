import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { CoreGateProvider } from "@/contexts/CoreGateContext";
import CoreGateWrapper from "@/components/CoreGateWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import GlobalMenu from "@/components/GlobalMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bridge.example.com"),
  title: "OneBridge — Блокчейн, криптовалюты и благотворительность",
  description:
    "Децентрализованная платформа. Tribe и Bridge — два бренда в одном пространстве.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-theme","onetribe");(function(){try{var l=localStorage.getItem("bridge-lang");document.documentElement.lang=l==="de"?"de":"ru"}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} antialiased`}
      >
        <ThemeProvider>
          <AdminProvider>
            <LanguageProvider>
              <AnalyticsProvider>
                <MusicPlayerProvider>
                  <CoreGateProvider>
                    <GlobalMenu />
                    <CoreGateWrapper>
                      <LayoutContent>{children}</LayoutContent>
                    </CoreGateWrapper>
                  </CoreGateProvider>
                </MusicPlayerProvider>
              </AnalyticsProvider>
            </LanguageProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
