import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hirakcoder.github.io"),
  title: "Hirak Banerjee — Engineer · Developer · Singer/Songwriter",
  description:
    "13+ years shipping enterprise software. iOS apps in 175 countries. Films. Music. I ship things that matter.",
  openGraph: {
    title: "Hirak Banerjee — Engineer · Developer · Singer/Songwriter",
    description: "13+ years shipping enterprise software. iOS apps in 175 countries.",
    images: ["/og-image.jpg"],
    url: "https://hirakcoder.github.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hirak8",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${playfair.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
