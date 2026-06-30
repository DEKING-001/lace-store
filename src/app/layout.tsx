import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aba Premium Net Fabrics | Quality Lace, Net & Fabrics",
  description:
    "Shop premium lace, net, chiffon, silk, and cotton fabrics in Nigeria. Quality materials for sewing, fashion design, and special occasions.",
  keywords: [
    "lace fabric",
    "net fabric",
    "chiffon",
    "silk",
    "cotton",
    "Nigeria fabric shop",
    "Aba fabrics",
    "fashion material",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
