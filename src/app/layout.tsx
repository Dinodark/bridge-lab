import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
            __html: `(function(){try{var t=localStorage.getItem("onebridge-theme");document.documentElement.setAttribute("data-theme",t==="onebridge"||t==="onetribe"?t:"onetribe")}catch(e){document.documentElement.setAttribute("data-theme","onetribe")}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} antialiased`}
      >
        <ThemeProvider>
          <GlobalMenu />
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
