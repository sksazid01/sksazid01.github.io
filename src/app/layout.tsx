import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Md Ahasanul Haque Sazid (Sk Sazid) - Full Stack Developer ",
  description: "Full Stack Developer Portfolio - Next.js, React, TypeScript, Python, Machine Learning",
  keywords: "Full Stack Developer, React, Next.js, Python, Machine Learning, Competitive Programming, Sk Sazid sksazid_sust",
  authors: [{ name: "Md Ahasanul Haque Sazid(Sk Sazid)" }],
  openGraph: {
    title: "Sk Sazid - Full Stack Developer",
    description: "Passionate Full Stack Developer with expertise in modern web technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
