"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { copy, type Locale } from "@/lib/content";
import SiteHeader from "@/components/site-header";

type Draft = {
  title: string;
  category: string;
  description: string;
  budget: string;
  timeframe: string;
};

export default function ProjectBriefForm({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const formText = text.project;
  const [draft, setDraft] = useState<Draft | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  function previewBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft({
      title: String(data.get("title") ?? "").trim(),
      category: String(data.get("category") ?? ""),
      description: String(data.get("description") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      timeframe: String(data.get("timeframe") ?? ""),
    });
  }

  const category = text.categories.find((item) => item.slug === draft?.category);
  const timeframe = draft?.timeframe === "flexible"
    ? formText.timelineFlexible
    : draft?.timeframe === "soon"
      ? formText.timelineSoon
      : draft?.timeframe === "month"
        ? formText.timelineMonth
        : formText.timelineNotSet;
  const budget = draft?.budget
    ? new Intl.NumberFormat(locale === "ar" ? "ar-KW" : "en-KW", {
        style: "currency",
        currency: "KWD",
        maximumFractionDigits: 3,
      }).format(Number(draft.budget))
    : formText.budgetNotSet;

  return (
    <main id="main-content" className="min-h-screen px-2 pb-2 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
      <a className="sr-only z-50 rounded-lg bg-white p-3 focus:not-sr-only focus:fixed focus:top-3 focus:start-3" href="#main-content">
        {text.skip}
      </a>
      <div className="site-frame">
        <SiteHeader locale={locale} page="post-project" />
        <section aria-labelledby="project-title" className="px-5 pb-14 pt-4 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24">
          <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className="mb-10 text-sm text-ink-soft">
            <Link className="underline decoration-1 underline-offset-4" href={`/${locale}`}>{formText.home}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link className="underline decoration-1 underline-offset-4" href={`/${locale}/browse`}>{formText.backToBrowse}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>{text.navProject}</span>
          </nav>

          <h1 id="project-title" className="max-w-[14ch] text-5xl font-medium leading-[0.98] tracking-[-0.075em] sm:text-6xl lg:text-7xl">{formText.title}</h1>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <p className="max-w-2xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">{formText.intro}</p>
            <p className="max-w-sm border-s-2 border-line ps-4 text-sm leading-6 text-ink-soft sm:mt-1">{formText.previewOnly}</p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.8fr)] lg:gap-16">
            <form className="space-y-7" onChange={() => setDraft(null)} onSubmit={previewBrief}>
              <div>
                <label className="block text-sm font-semibold" htmlFor="brief-title">{formText.titleLabel}<span aria-hidden="true"> *</span></label>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{formText.titleHint}</p>
                <input ref={titleRef} autoComplete="off" className="mt-3 min-h-13 w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-base outline-none transition-colors focus:border-ink" id="brief-title" maxLength={90} minLength={6} name="title" placeholder={formText.titlePlaceholder} required />
              </div>

              <div>
                <label className="block text-sm font-semibold" htmlFor="brief-category">{formText.categoryLabel}<span aria-hidden="true"> *</span></label>
                <select className="mt-3 min-h-13 w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-base outline-none focus:border-ink" defaultValue="" id="brief-category" name="category" required>
                  <option disabled value="">{formText.categoryPlaceholder}</option>
                  {text.categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold" htmlFor="brief-description">{formText.descriptionLabel}<span aria-hidden="true"> *</span></label>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{formText.descriptionHint}</p>
                <textarea className="mt-3 min-h-44 w-full resize-y rounded-xl border border-line bg-white/80 px-4 py-3 text-base leading-7 outline-none transition-colors focus:border-ink" id="brief-description" maxLength={2000} minLength={40} name="description" placeholder={formText.descriptionPlaceholder} required />
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold" htmlFor="brief-budget">{formText.budgetLabel}</label>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{formText.budgetHint}</p>
                  <div className="mt-3 flex min-h-13 items-center rounded-xl border border-line bg-white/80 focus-within:border-ink">
                    <span className="ps-4 text-sm font-semibold text-ink-soft">KWD</span>
                    <input className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none" id="brief-budget" inputMode="decimal" min="0.001" name="budget" placeholder="0.000" step="0.001" type="number" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold" htmlFor="brief-timeframe">{formText.timelineLabel}</label>
                  <select className="mt-3 min-h-13 w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-base outline-none focus:border-ink" defaultValue="" id="brief-timeframe" name="timeframe">
                    <option value="">{formText.timelinePlaceholder}</option>
                    <option value="flexible">{formText.timelineFlexible}</option>
                    <option value="soon">{formText.timelineSoon}</option>
                    <option value="month">{formText.timelineMonth}</option>
                  </select>
                </div>
              </div>

              <button aria-label={formText.previewAction} className="accent-glass inline-flex min-h-14 items-center gap-6 rounded-full px-6 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]" type="submit">
                {formText.previewAction}<span aria-hidden="true">↗</span>
              </button>
            </form>

            <aside aria-live="polite" className="self-start bg-ink px-6 py-7 text-paper sm:px-8 sm:py-9 lg:sticky lg:top-6">
              <h2 className="text-2xl font-medium tracking-tight">{formText.previewTitle}</h2>
              {draft ? (
                <div className="mt-6 border-t border-white/20 pt-6">
                  <p className="text-sm text-paper/65">{category?.name}</p>
                  <h3 className="mt-2 text-2xl font-medium leading-tight tracking-tight">{draft.title}</h3>
                  <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-paper/85">{draft.description}</p>
                  <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/20 pt-5 text-sm">
                    <div>
                      <dt className="text-paper/60">{formText.summaryBudgetLabel}</dt>
                      <dd className="mt-1 font-semibold">{budget}</dd>
                    </div>
                    <div>
                      <dt className="text-paper/60">{formText.summaryTimelineLabel}</dt>
                      <dd className="mt-1 font-semibold">{timeframe}</dd>
                    </div>
                  </dl>
                  <button aria-label={formText.previewEdit} className="mt-7 text-sm font-semibold underline decoration-1 underline-offset-4" onClick={() => { setDraft(null); titleRef.current?.focus(); }} type="button">
                    {formText.previewEdit}
                  </button>
                </div>
              ) : (
                <p className="mt-5 border-t border-white/20 pt-5 text-sm leading-7 text-paper/75">{formText.previewEmpty}</p>
              )}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
