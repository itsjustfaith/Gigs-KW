import Link from "next/link";
import { copy, type Locale } from "@/lib/content";

type Page = "home" | "browse" | "post-project" | "profile";

export default function SiteHeader({ locale, page, profileSlug }: { locale: Locale; page: Page; profileSlug?: string }) {
  const text = copy[locale];
  const alternate = locale === "en" ? "ar" : "en";
  const homeHref = `/${locale}`;
  const browseHref = `/${locale}/browse`;
  const categoryHref = page === "home" ? "#categories" : browseHref;
  const howHref = page === "home" ? "#how-it-works" : `${homeHref}#how-it-works`;
  const currentPage = page === "home"
    ? ""
    : page === "browse"
      ? "/browse"
      : page === "post-project"
        ? "/post-project"
        : `/freelancers/${profileSlug ?? ""}`;

  return (
    <header className="relative z-10 flex min-h-20 items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
      <Link aria-label={locale === "ar" ? "الصفحة الرئيسية لـ Gigs" : "Gigs home"} className="text-3xl font-semibold tracking-[-0.09em]" href={homeHref}>
        gigs<span className="text-accent-gradient">.</span>
      </Link>

      <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"} className="hidden items-center gap-5 text-sm font-medium md:flex lg:gap-8">
        <Link className="transition-colors hover:text-ink-soft" href={categoryHref}>{text.navCategories}</Link>
        <Link className="transition-colors hover:text-ink-soft" href={howHref}>{text.navHow}</Link>
        {page === "browse" && <Link className="transition-colors hover:text-ink-soft" href={`/${locale}/post-project`}>{text.navProject}</Link>}
      </nav>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-paper-dark sm:px-4"
          href={`/${alternate}${currentPage}`}
          hrefLang={alternate}
          lang={alternate}
        >
          {text.language}
        </Link>
        <Link aria-label={text.navCategories} className="accent-glass grid size-11 place-items-center rounded-full md:hidden" href={page === "home" ? "#categories" : browseHref}>
          <svg aria-hidden="true" className="size-5" viewBox="0 0 20 20" fill="none">
            <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.7" />
            <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
