import type { Metadata } from "next";
import { Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Serena & Tiziano — 1° Anniversario",
  description: "Sei invitato a cena per il nostro primo anniversario di matrimonio — 30 Maggio 2026",
  openGraph: {
    title: "Serena & Tiziano — 1° Anniversario",
    description: "Sei invitato a cena per il nostro primo anniversario di matrimonio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${montserrat.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
