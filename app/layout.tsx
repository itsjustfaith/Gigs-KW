import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gigs | Find your people for good work",
  description:
    "Find independent talent in Kuwait for design, development, writing, marketing, video, tutoring, and consulting.",
  alternates: {
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-gigs-locale") === "ar" ? "ar" : "en";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
