import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LandingPage from "@/components/landing-page";
import { copy, type Locale } from "@/lib/content";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") return {};

  return {
    title: copy[locale].metadataTitle,
    description: copy[locale].metadataDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  return <LandingPage locale={locale as Locale} />;
}
