import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FloatingCat from "@/components/FloatingCat";
import LangProvider from "@/components/LangProvider";
import { getLang } from "@/lib/lang.server";
import { ui } from "@/data";

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600" },
  ],
  variable: "--font-general-sans",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "dark",
};

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
        className={`${generalSans.variable} ${jetbrains.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          {ui[lang].nav.skip}
        </a>
        <LangProvider initial={lang}>
          {children}
          <FloatingCat />
        </LangProvider>
      </body>
    </html>
  );
}
