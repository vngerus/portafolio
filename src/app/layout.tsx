import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FloatingCat from "@/components/FloatingCat";
import LangProvider from "@/components/LangProvider";
import { getLang } from "@/lib/lang.server";
import { ui } from "@/data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return ui[lang].meta;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LangProvider initial={lang}>
          {children}
          <FloatingCat />
        </LangProvider>
      </body>
    </html>
  );
}
