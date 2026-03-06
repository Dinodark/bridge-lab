import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export default function TribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bebas.variable} ${cormorant.variable}`}>
      {children}
    </div>
  );
}
