import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import Script from "next/script";

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
  title: "Md Ahasanul Haque Sazid (Sk Sazid) - Full Stack Developer | SUST CSE",
  description: "Md Ahasanul Haque Sazid (Sk Sazid) - Full Stack Developer from SUST CSE, Bogura. Expert in Next.js, React, TypeScript, Python, Machine Learning. Final year Computer Science student at SUST with expertise in competitive programming.",
  keywords: "Sk Sazid, Sk Sazid, sk_sazid, sksazid, Sk Sazid sust, sksazid_sust, sazid sust, sazid, sk, sk sust, sazid cse, sk cse, sk bogura, sk bogra, sazid bogura, Md Ahasanul Haque Sazid, ahasanul haque sazid, ahasanul, ahasanul haque, md ahasanul, ahasanul sust, ahasanul cse, ahasanul sazid, ahasanul bogura, Full Stack Developer, SUST CSE, Shahjalal University, React, Next.js, Python, Machine Learning, Competitive Programming, Web Developer SUST, Computer Science SUST, Bogura Developer",
  authors: [{ name: "Md Ahasanul Haque Sazid (Sk Sazid)" }],
  creator: "Sk Sazid",
  publisher: "Sk Sazid",
  openGraph: {
    title: "Sk Sazid - Full Stack Developer | SUST CSE",
    description: "Sk Sazid (sk_sazid, sksazid_sust) - Passionate Full Stack Developer from SUST with expertise in modern web technologies, AI/ML, and competitive programming",
    type: "website",
    siteName: "Sk Sazid Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sk Sazid - Full Stack Developer | SUST CSE",
    description: "Sk Sazid - Full Stack Developer from SUST CSE with expertise in Next.js, React, Python, and Machine Learning",
    creator: "@sk_sazid",
  },
  alternates: {
    canonical: "https://sksazid.me",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HBCKN7244Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HBCKN7244Q');
          `}
        </Script>

        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
