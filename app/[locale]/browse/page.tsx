import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrowseServices from "@/components/browse-services";
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
  const text = copy[locale].browse;

  return {
    title: text.metadataTitle,
    description: text.metadataDescription,
    alternates: {
      canonical: `/${locale}/browse`,
      languages: { en: "/en/browse", ar: "/ar/browse" },
    },
  };
}

export default async function BrowsePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const [{ locale }, { category }] = await Promise.all([params, searchParams]);
  if (locale !== "en" && locale !== "ar") notFound();
  const initialCategory = Array.isArray(category) ? category[0] ?? "" : category ?? "";
  const isDemoMode = process.env.NODE_ENV === "development";
  const listings = isDemoMode ? (await import("@/lib/demo-listings")).demoListings : [];

  return <BrowseServices locale={locale as Locale} initialCategory={initialCategory} isDemoMode={isDemoMode} listings={listings} />;
}
