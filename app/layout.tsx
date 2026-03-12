import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADAM WONDALE — Full Stack Developer",
  description:
    "Full Stack Developer specializing in building fast, beautiful, and scalable web applications. Available for hire.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23FFD700'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='44' font-family='system-ui, sans-serif' font-weight='800' fill='%23000000' letter-spacing='-2'>AW</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
