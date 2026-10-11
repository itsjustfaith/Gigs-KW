import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectBriefForm from "@/components/project-brief-form";
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
  const text = copy[locale].project;

  return {
    title: text.metadataTitle,
    description: text.metadataDescription,
    alternates: {
      canonical: `/${locale}/post-project`,
      languages: { en: "/en/post-project", ar: "/ar/post-project" },
    },
  };
}

export default async function PostProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  return <ProjectBriefForm locale={locale as Locale} />;
}
