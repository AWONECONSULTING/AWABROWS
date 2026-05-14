import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWABROWS",
  description:
    "Studio sourcils specialise en diagnostic, brow design, brow lift et shading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={geist.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
