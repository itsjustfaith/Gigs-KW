"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/site-header";
import { copy, type Locale } from "@/lib/content";
import type { DemoListing } from "@/lib/demo-listings";

type SortMode = "default" | "price-asc" | "price-desc";

export default function BrowseServices({
  locale,
  initialCategory,
  isDemoMode,
  listings,
}: {
  locale: Locale;
  initialCategory: string;
  isDemoMode: boolean;
  listings: DemoListing[];
}) {
  const text = copy[locale];
  const browse = text.browse;
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(() =>
    text.categories.some((category) => category.slug === initialCategory) ? initialCategory : "",
  );
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [page, setPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pageSize = isSmallScreen ? 6 : 4;
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const selectedCategory = text.categories.find((category) => category.slug === selectedSlug);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updatePageSize = () => {
      setIsSmallScreen(mediaQuery.matches);
      setPage(1);
    };

    updatePageSize();
    mediaQuery.addEventListener("change", updatePageSize);
    return () => mediaQuery.removeEventListener("change", updatePageSize);
  }, []);

  const matchingCategories = useMemo(() => {
    if (!normalizedQuery) return text.categories;
    return text.categories.filter((category) => {
      const listing = listings.find((item) => item.categorySlug === category.slug);
      const localized = listing?.[locale];
      const searchable = `${category.name} ${category.description} ${localized?.name ?? ""} ${localized?.service ?? ""} ${localized?.description ?? ""} ${localized?.languages ?? ""}`;
      return searchable.toLocaleLowerCase(locale).includes(normalizedQuery);
    });
  }, [locale, listings, normalizedQuery, text.categories]);

  const filteredListings = useMemo(() => {
    const matches = isDemoMode
      ? listings.filter((listing) => {
          const category = text.categories.find((item) => item.slug === listing.categorySlug);
          const localized = listing[locale];
          const matchesCategory = !selectedSlug || listing.categorySlug === selectedSlug;
          const searchable = `${localized.name} ${localized.service} ${localized.description} ${localized.languages} ${category?.name ?? ""} ${category?.description ?? ""}`;
          return matchesCategory && (!normalizedQuery || searchable.toLocaleLowerCase(locale).includes(normalizedQuery));
        })
      : [];

    if (sortMode === "price-asc") return [...matches].sort((a, b) => a.priceMin - b.priceMin);
    if (sortMode === "price-desc") return [...matches].sort((a, b) => b.priceMin - a.priceMin);
    return matches;
  }, [isDemoMode, listings, locale, normalizedQuery, selectedSlug, sortMode, text.categories]);

  const pageCount = Math.ceil(filteredListings.length / pageSize);
  const currentPage = Math.min(page, Math.max(1, pageCount));
  const pageListings = filteredListings.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const priceFormatter = new Intl.NumberFormat(locale === "ar" ? "ar-KW" : "en-KW", {
    maximumFractionDigits: 3,
  });

  function selectCategory(slug: string) {
    setSelectedSlug(slug);
    setPage(1);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <main id="main-content" className="min-h-screen px-2 pb-2 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
      <a className="sr-only z-50 rounded-lg bg-white p-3 focus:not-sr-only focus:fixed focus:top-3 focus:start-3" href="#main-content">
        {text.skip}
      </a>
      <div className="site-frame">
        <SiteHeader locale={locale} page="browse" />
        <section aria-labelledby="browse-title" className="px-5 pb-14 pt-4 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className="mb-8 text-sm text-ink-soft">
            <Link className="underline decoration-1 underline-offset-4" href={`/${locale}`}>{text.project.home}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>{text.navCategories}</span>
          </nav>

          <div className="grid gap-7 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)] md:items-end md:gap-12 md:pb-9">
            <div>
                      <h1 id="browse-title" className="max-w-[15ch] text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.075em]">
                {browse.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">{browse.intro}</p>
            </div>
            <form className="flex min-h-14 items-center gap-2 rounded-2xl border border-line bg-white/80 p-2 focus-within:border-ink/60" onSubmit={(event) => event.preventDefault()} role="search">
              <label className="sr-only" htmlFor="browse-search">{browse.searchLabel}</label>
              <span aria-hidden="true" className="ps-2 text-lg text-ink-soft">⌕</span>
              <input
                id="browse-search"
                className="min-h-10 min-w-0 flex-1 bg-transparent px-2 text-base outline-none placeholder:text-ink-soft/65"
                onChange={(event) => updateQuery(event.target.value)}
                placeholder={browse.searchPlaceholder}
                dir="auto"
                type="search"
                value={query}
              />
              {query && <button aria-label={browse.clearSearch} className="min-h-10 rounded-xl px-3 text-sm font-semibold underline decoration-1 underline-offset-4" onClick={() => updateQuery("")} type="button">{browse.clearSearch}</button>}
            </form>
          </div>

          {isDemoMode && <p className="mt-5 rounded-2xl border border-line bg-paper-dark px-4 py-3 text-sm leading-6 text-ink-soft" role="note">{browse.demoNotice}</p>}

          <div className="mt-8 grid gap-8 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-10">
            <aside aria-labelledby="categories-heading" className="self-start lg:sticky lg:top-6">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 id="categories-heading" className="text-lg font-semibold tracking-tight">{browse.categoriesHeading}</h2>
                <span className="text-xs text-ink-soft">{text.categories.length}</span>
              </div>
              <div className="flex flex-wrap gap-2 pb-2 lg:block lg:overflow-visible lg:pb-0" role="group" aria-label={browse.categoriesHeading}>
                <button
                  aria-label={browse.allResults}
                  aria-pressed={!selectedSlug}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-sm transition-colors lg:mb-1 lg:w-full lg:rounded-xl lg:text-start ${!selectedSlug ? "border-ink bg-ink text-paper" : "border-line bg-white/60 hover:bg-white"}`}
                  onClick={() => selectCategory("")}
                  type="button"
                >{browse.allResults}</button>
                {matchingCategories.map((category) => {
                  const active = category.slug === selectedSlug;
                  return (
                    <button
                      aria-label={`${browse.categoriesHeading}: ${category.name}`}
                      aria-pressed={active}
                      className={`min-h-10 shrink-0 rounded-full border px-4 text-sm transition-colors lg:mb-1 lg:w-full lg:rounded-xl lg:text-start ${active ? "border-ink bg-ink text-paper" : "border-line bg-white/60 hover:bg-white"}`}
                      key={category.slug}
                      onClick={() => selectCategory(active ? "" : category.slug)}
                      type="button"
                    >{category.name}</button>
                  );
                })}
              </div>
              {matchingCategories.length === 0 && <p className="mt-3 text-sm leading-6 text-ink-soft" role="status">{browse.noResults}</p>}
              <Link className="mt-6 hidden min-h-11 items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4 lg:inline-flex" href={`/${locale}/post-project`}>
                {text.navProject}<span aria-hidden="true">↗</span>
              </Link>
            </aside>

            <div className="min-w-0">
              {isDemoMode ? (
                <section aria-labelledby="demo-listings-title">
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-ink-soft">{selectedCategory?.name ?? browse.allResults}</p>
                      <h2 id="demo-listings-title" className="mt-1 text-3xl font-medium leading-tight tracking-[-0.04em]">{browse.demoHeading}</h2>
                      <p className="mt-1 text-sm text-ink-soft" aria-live="polite">{filteredListings.length} {browse.resultsLabel}</p>
                    </div>
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <label className="text-sm text-ink-soft" htmlFor="browse-sort">{browse.sortLabel}</label>
                      <select
                        className="min-h-11 w-full max-w-52 rounded-xl border border-line bg-white/80 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ink sm:w-auto"
                        id="browse-sort"
                        onChange={(event) => { setSortMode(event.target.value as SortMode); setPage(1); }}
                        value={sortMode}
                      >
                        <option value="default">{browse.sortDefault}</option>
                        <option value="price-asc">{browse.sortPriceAsc}</option>
                        <option value="price-desc">{browse.sortPriceDesc}</option>
                      </select>
                    </div>
                  </div>

                  {pageListings.length ? (
                    <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                      {pageListings.map((listing) => {
                        const localized = listing[locale];
                        const category = text.categories.find((item) => item.slug === listing.categorySlug);
                        return (
                          <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white/85 shadow-[0_0.35rem_1.2rem_rgba(37,40,32,0.05)]" key={listing.categorySlug}>
                            <div className="relative">
                              <div className="relative h-36 overflow-hidden bg-paper-dark sm:h-40">
                                <Image alt="" className="object-cover" fill sizes="(min-width: 1536px) 25vw, (min-width: 768px) 40vw, 100vw" src={listing.coverImage} />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                                <span className="absolute bottom-3 start-3 rounded-full border border-white/60 bg-paper/80 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">{category?.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5">
                              <Image alt="" className="size-16 shrink-0 rounded-full border-2 border-white bg-white object-cover shadow-sm" height={64} src={listing.portrait} width={64} />
                              <span className="max-w-full rounded-full border border-line bg-paper/80 px-3 py-1.5 text-[0.62rem] font-semibold text-ink-soft">{browse.demoBadge}</span>
                            </div>
                            <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                              <h3 className="break-words text-base font-semibold leading-6 tracking-tight">{localized.name}</h3>
                              <a className="mt-1 w-fit max-w-full break-words text-[0.68rem] leading-5 text-ink-soft underline decoration-1 underline-offset-2" href={listing.photoUrl} rel="noreferrer" target="_blank">
                                {browse.photoCredit} {listing.photographer}
                              </a>
                              <h4 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{localized.service}</h4>
                              <p className="mt-2 flex-1 break-words text-sm leading-6 text-ink-soft">{localized.description}</p>
                              <div className="mt-5 grid gap-3 border-t border-line pt-4">
                                <div>
                                  <p className="text-xs text-ink-soft">{browse.demoLanguagesLabel}</p>
                                  <p className="mt-1 text-sm font-semibold">{localized.languages}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-ink-soft">{browse.demoPriceLabel}</p>
                                  <p className="mt-1 break-words text-sm font-semibold">{priceFormatter.format(listing.priceMin)} – {priceFormatter.format(listing.priceMax)} {locale === "ar" ? "د.ك" : "KWD"}</p>
                                </div>
                              </div>
                              <Link className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold underline decoration-1 underline-offset-4" href={`/${locale}/freelancers/${listing.slug}`}>
                                {browse.viewProfile}<span aria-hidden="true">↗</span>
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-line bg-white/60 px-5 py-8 text-sm leading-6 text-ink-soft" role="status">{browse.noResults}</p>
                  )}

                  {pageCount > 1 && (
                    <nav aria-label={browse.paginationLabel} className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-6">
                      <button
                        aria-label={browse.previousPage}
                        className="min-h-10 rounded-full border border-line px-4 text-sm font-medium transition-colors enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                        disabled={currentPage === 1}
                        onClick={() => setPage((value) => Math.max(1, value - 1))}
                        type="button"
                      >{browse.previousPage}</button>
                      {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                          aria-current={pageNumber === currentPage ? "page" : undefined}
                          aria-label={`${browse.pageLabel} ${pageNumber}`}
                          className={`grid size-10 place-items-center rounded-full border text-sm font-semibold transition-colors ${pageNumber === currentPage ? "accent-glass border-transparent text-ink" : "border-line hover:bg-white"}`}
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          type="button"
                        >{pageNumber}</button>
                      ))}
                      <span className="px-2 text-sm text-ink-soft">{browse.pageLabel} {currentPage} {browse.ofLabel} {pageCount}</span>
                      <button
                        aria-label={browse.nextPage}
                        className="min-h-10 rounded-full border border-line px-4 text-sm font-medium transition-colors enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                        disabled={currentPage === pageCount}
                        onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                        type="button"
                      >{browse.nextPage}</button>
                    </nav>
                  )}
                </section>
              ) : (
                <aside aria-live="polite" className="bg-ink px-6 py-8 text-paper sm:px-9 sm:py-10">
                  <p className="text-sm text-paper/65">{selectedCategory?.name ?? browse.allResults}</p>
                  <h2 className="mt-3 max-w-[16ch] text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">{browse.emptyTitle}</h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-paper/75">{browse.emptyText}</p>
                  <Link className="accent-glass mt-7 inline-flex min-h-12 items-center gap-5 rounded-full px-5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]" href={`/${locale}/post-project`}>
                    {browse.emptyAction}<span aria-hidden="true">↗</span>
                  </Link>
                </aside>
              )}
            </div>
          </div>

          <div className="mt-10 border-t border-line pt-5 lg:hidden">
            <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4" href={`/${locale}/post-project`}>
              {text.navProject}<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
