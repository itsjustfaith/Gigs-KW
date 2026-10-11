"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { copy, Locale } from "@/lib/content";

type Copy = (typeof copy)[Locale];

export default function CategoryExplorer({
  locale,
  text,
}: {
  locale: Locale;
  text: Copy;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return text.categories;
    return text.categories.filter((category) =>
      `${category.name} ${category.description}`.toLocaleLowerCase().includes(normalized),
    );
  }, [query, text.categories]);

  return (
    <>
      <form
        className="mb-8 flex flex-col gap-2 rounded-2xl border border-line bg-white p-2 sm:flex-row sm:items-center"
        onSubmit={(event) => event.preventDefault()}
        role="search"
      >
        <label className="sr-only" htmlFor="category-search">
          {text.searchLabel}
        </label>
        <input
          id="category-search"
          className="min-h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-base outline-none placeholder:text-ink-soft/65"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={text.searchPlaceholder}
          dir="auto"
          type="search"
          value={query}
        />
        {query ? (
          <button
            aria-label={text.clearSearch}
            className="min-h-11 rounded-xl px-4 text-sm font-semibold underline decoration-1 underline-offset-4"
            onClick={() => setQuery("")}
            type="button"
          >
            {text.clearSearch}
          </button>
        ) : (
          <span aria-hidden="true" className="me-3 grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white">
            <svg className="size-4" viewBox="0 0 20 20" fill="none">
              <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.6" />
              <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </form>

      <p className="mb-4 min-h-6 text-sm text-ink-soft" aria-live="polite">
        {filtered.length > 0 ? text.resultHint : text.noResults}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((category) => (
          <Link
            className="category-card group flex min-h-36 items-start justify-between rounded-2xl border border-line bg-paper p-5 focus-visible:z-10"
            href={`/${locale}/browse?category=${category.slug}`}
            key={category.name}
          >
            <span>
              <span className="block text-lg font-semibold tracking-tight">{category.name}</span>
              <span className="mt-2 block max-w-56 text-sm leading-6 text-ink-soft">
                {category.description}
              </span>
            </span>
            <span className="accent-glass ms-4 grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold" aria-hidden="true">
              {category.mark}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
