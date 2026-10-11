import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioProjects from "@/components/portfolio-projects";
import SiteHeader from "@/components/site-header";
import { copy, type Locale } from "@/lib/content";
import type { DemoListing } from "@/lib/demo-listings";

function isProviderUrlAllowed(provider: "canva" | "google-docs", value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    return provider === "canva"
      ? url.hostname === "canva.com" || url.hostname.endsWith(".canva.com")
      : url.hostname === "docs.google.com";
  } catch {
    return false;
  }
}

async function findDemoListing(slug: string): Promise<DemoListing | undefined> {
  if (process.env.NODE_ENV !== "development") return undefined;
  const { demoListings } = await import("@/lib/demo-listings");
  return demoListings.find((listing) => listing.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "ar") return {};
  const listing = await findDemoListing(slug);
  if (!listing) notFound();

  return {
    title: `${listing[locale].name} | Gigs`,
    description: listing[locale].service,
    robots: { index: false, follow: false },
  };
}

export default async function FreelancerProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "ar") notFound();
  const listing = await findDemoListing(slug);
  if (!listing) notFound();

  const text = copy[locale as Locale];
  const browse = text.browse;
  const localized = listing[locale as Locale];
  const category = text.categories.find((item) => item.slug === listing.categorySlug);
  const priceFormatter = new Intl.NumberFormat(locale === "ar" ? "ar-KW" : "en-KW", {
    maximumFractionDigits: 3,
  });

  return (
    <main id="main-content" className="min-h-screen px-2 pb-2 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
      <a className="sr-only z-50 rounded-lg bg-white p-3 focus:not-sr-only focus:fixed focus:top-3 focus:start-3" href="#main-content">
        {text.skip}
      </a>
      <div className="site-frame">
        <SiteHeader locale={locale as Locale} page="profile" profileSlug={listing.slug} />
        <section aria-labelledby="profile-title" className="px-5 pb-14 pt-4 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className="mb-8 flex flex-wrap items-center gap-y-2 text-sm text-ink-soft">
            <Link className="underline decoration-1 underline-offset-4" href={`/${locale}`}>{text.project.home}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>{localized.name}</span>
          </nav>
          <Link
            aria-label={browse.backToBrowse}
            className="mb-6 grid size-11 place-items-center rounded-full border border-line bg-white/60 text-xl transition-colors hover:bg-white"
            href={`/${locale}/browse`}
          >
            <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
          </Link>

          <p className="mb-3 text-sm font-semibold text-ink-soft">{category?.name}</p>
          <h1 id="profile-title" className="max-w-[17ch] text-4xl font-medium leading-[1.02] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
            {localized.name}
          </h1>

          <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-8">
            <div className="relative min-h-64 overflow-hidden rounded-2xl bg-paper-dark sm:min-h-80 lg:min-h-[34rem]">
              <Image alt="" className="object-cover" fill fetchPriority="high" sizes="(min-width: 1024px) 55vw, 100vw" src={listing.coverImage} />
              <span className="absolute bottom-4 start-4 rounded-full border border-white/70 bg-paper/90 px-4 py-2 text-sm font-semibold backdrop-blur-sm">{category?.name}</span>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <section aria-labelledby="service-title" className="border-y border-line py-6 sm:py-8">
                <div className="flex items-center gap-4">
                  <Image alt="" className="size-16 shrink-0 rounded-full border-2 border-white object-cover shadow-sm" height={64} src={listing.portrait} width={64} />
                  <div className="min-w-0">
                    <p className="break-words text-sm font-semibold">{localized.name}</p>
                    <a className="mt-1 inline-block max-w-full break-words text-xs leading-5 text-ink-soft underline decoration-1 underline-offset-2" href={listing.photoUrl} rel="noreferrer" target="_blank">
                      {browse.photoCredit} {listing.photographer}
                    </a>
                  </div>
                </div>
                <p className="mt-7 text-sm text-ink-soft">{browse.profileServiceLabel}</p>
                <h2 id="service-title" className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{localized.service}</h2>
                <p className="mt-4 text-base leading-7 text-ink-soft">{localized.description}</p>
              </section>

              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-ink-soft">{browse.demoLanguagesLabel}</dt>
                  <dd className="mt-1 font-semibold">{localized.languages}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-soft">{browse.demoPriceLabel}</dt>
                  <dd className="mt-1 font-semibold">{priceFormatter.format(listing.priceMin)} – {priceFormatter.format(listing.priceMax)} {locale === "ar" ? "د.ك" : "KWD"}</dd>
                </div>
              </dl>

              <p className="border-s-2 border-line ps-4 text-sm leading-6 text-ink-soft" role="note">{browse.profileDisclosure}</p>
            </div>
          </div>

          <PortfolioProjects locale={locale as Locale} projects={listing.portfolio[locale as Locale]} text={browse} />
          {!!listing.portfolioLinks?.length && (
            <div className="mt-7 border-t border-line pt-5">
              <h3 className="text-sm font-semibold">{browse.portfolioLinksHeading}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {listing.portfolioLinks.filter((item) => isProviderUrlAllowed(item.provider, item.url)).map((item) => {
                  const label = item.provider === "canva" ? browse.canvaPortfolio : browse.googleDocsPortfolio;
                  return (
                    <a className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-line bg-white/70 px-4 py-2 text-sm font-semibold underline decoration-1 underline-offset-4 transition-colors hover:bg-white" href={item.url} key={`${item.provider}:${item.url}`} rel="noopener noreferrer" target="_blank">
                      {item.provider === "canva" ? (
                        <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#00c4cc,#7d2ae8)] text-lg font-semibold text-white">C</span>
                      ) : (
                        <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
                          <path d="M6 2.75h8l5 5v13.5H6a2 2 0 0 1-2-2v-14.5a2 2 0 0 1 2-2Z" fill="#e8f0fe" stroke="#4285f4" strokeWidth="1.5" />
                          <path d="M14 2.75v5h5M8 12h8M8 15.5h8" stroke="#4285f4" strokeLinecap="round" strokeWidth="1.5" />
                        </svg>
                      )}
                      {label}<span aria-hidden="true">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
