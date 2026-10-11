import CategoryExplorer from "@/components/category-explorer";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import { copy, type Locale } from "@/lib/content";

function ArrowIcon({ direction = "forward" }: { direction?: "forward" | "down" }) {
  return direction === "down" ? (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5v12m0 0 5-5m-5 5-5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LandingPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const localePrefix = `/${locale}`;

  return (
    <main id="main-content" className="min-h-screen px-2 pb-2 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
      <a className="sr-only z-50 rounded-lg bg-white p-3 focus:not-sr-only focus:fixed focus:top-3 focus:start-3" href="#main-content">
        {text.skip}
      </a>

      <div className="site-frame">
        <SiteHeader locale={locale} page="home" />

        <section aria-labelledby="hero-title" className="grid gap-6 px-3 pb-5 sm:px-5 sm:pb-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-0 lg:px-2 lg:pb-2">
          <div className="visual-art order-2 lg:order-1">
            <Image className="art-main-image" src="/images/creative-workspace.jpg" alt="" fill sizes="(min-width: 1024px) 48vw, 100vw" fetchPriority="high" />
            <Image className="art-card art-video-image" src="/images/video-editing.jpg" alt="" width={720} height={520} sizes="(min-width: 1024px) 22vw, 43vw" />
            <Image className="art-card art-writing-image" src="/images/writing-desk.jpg" alt="" width={720} height={520} sizes="(min-width: 1024px) 22vw, 43vw" />
            <span className="art-caption" dir={locale === "ar" ? "rtl" : "ltr"}>{text.artLocation}</span>
            <span className="art-note" dir={locale === "ar" ? "rtl" : "ltr"}>
              <strong className="block font-semibold">{text.placeholderLabel}</strong>
              <span className="mt-1 block text-ink-soft">{text.placeholderText}</span>
              <span className="mt-2 block text-[0.68rem] text-ink-soft">
                {locale === "ar" ? "الصور: " : "Photos: "}<a className="underline underline-offset-2" href="https://unsplash.com/photos/laptop-with-photo-editing-workspace-K8LBiiWuoA8" target="_blank" rel="noreferrer">Rodrigo Rodrigues</a>, <a className="underline underline-offset-2" href="https://unsplash.com/photos/laptop-set-up-for-video-editing-Zai_PqcdACg" target="_blank" rel="noreferrer">Grigorii Shcheglov</a> &amp; <a className="underline underline-offset-2" href="https://unsplash.com/photos/open-notebook-with-pen-and-pencils-on-desk-n9AaeihA9HI" target="_blank" rel="noreferrer">Clay Banks</a> / Unsplash
              </span>
            </span>
          </div>

          <div className="order-1 flex min-h-[32rem] flex-col justify-center px-4 py-10 text-center sm:px-10 lg:order-2 lg:min-h-[42rem] lg:px-[clamp(2rem,7vw,7rem)] lg:py-14">
            <p className="mb-5 text-sm font-semibold text-ink-soft">{text.eyebrow}</p>
            <h1 id="hero-title" className="mx-auto max-w-[12ch] text-balance text-5xl font-medium leading-[0.98] tracking-[-0.075em] sm:text-6xl lg:text-[clamp(3.75rem,6.5vw,6.6rem)]">
              {text.headline}
            </h1>
            <p className="mx-auto mt-7 max-w-[34rem] text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              {text.intro}
            </p>
            <div className="mt-8 flex items-center justify-center">
              <a className="accent-glass inline-flex min-h-14 w-full max-w-64 items-center justify-between gap-6 rounded-full ps-6 pe-2 text-start text-sm font-semibold transition-transform hover:scale-[1.02] sm:w-auto" href={`${localePrefix}/browse`}>
                {text.primaryAction}
                <span className="grid size-10 place-items-center rounded-full bg-ink text-white"><ArrowIcon /></span>
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-5">
              <a className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold underline decoration-1 underline-offset-4 transition-colors hover:bg-paper-dark" href={`${localePrefix}/post-project`}>
                {text.secondaryAction}<ArrowIcon direction="down" />
              </a>
              <a className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm text-ink-soft underline decoration-1 underline-offset-4 transition-colors hover:bg-paper-dark" href="#categories">
                {text.navCategories}<ArrowIcon direction="down" />
              </a>
            </div>
          </div>
        </section>

        <section id="categories" aria-labelledby="categories-title" className="scroll-mt-8 border-t border-line px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
          <div className="mb-9 grid gap-3 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold text-ink-soft">{text.servicesEyebrow}</p>
              <h2 id="categories-title" className="max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-5xl">{text.servicesTitle}</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-ink-soft md:justify-self-end">{text.servicesIntro}</p>
          </div>
          <CategoryExplorer locale={locale} text={text} />
        </section>

        <section id="how-it-works" aria-labelledby="ways-title" className="scroll-mt-8 bg-ink px-5 py-16 text-paper sm:px-8 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-accent-gradient mb-3 text-sm font-semibold">{text.waysEyebrow}</p>
              <h2 id="ways-title" className="max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-5xl">{text.waysTitle}</h2>
            </div>
            <div className="grid gap-3">
              {text.ways.map((way) => (
                <article className="grid gap-4 border-t border-white/20 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8" key={way.title}>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{way.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-paper/75">{way.text}</p>
                  </div>
                  <a className="text-accent-gradient inline-flex items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4 sm:ms-5" href={`${localePrefix}${way.href}`}>
                    {way.action}<ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/20 pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-medium tracking-tight">{text.howTitle}</h3>
              <ol className="mt-6 grid gap-5 sm:grid-cols-3">
                {text.steps.map((step, index) => (
                  <li key={step.title}>
                    <span className="text-accent-gradient mb-2 block text-xs">{String(index + 1).padStart(2, "0")}</span>
                    <strong className="block text-base font-semibold">{step.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-paper/70">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="accent-glass rounded-2xl p-5 text-ink md:max-w-64">
              <p className="text-xs font-semibold">{text.feeLabel}</p>
              <p className="mt-2 text-lg font-semibold leading-snug">{text.feeText}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{text.feeDetail}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="grid gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-16 lg:py-24">
          <div>
            <p className="mb-3 text-sm font-semibold text-ink-soft">{text.faqEyebrow}</p>
            <h2 id="faq-title" className="max-w-[12ch] text-4xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-5xl">{text.faqTitle}</h2>
          </div>
          <div>
            {text.faq.map((item, index) => (
              <details className="faq-row group border-t border-line py-5" key={item.question} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold marker:content-none sm:text-lg">
                  {item.question}
                  <span aria-hidden="true" className="accent-glass faq-icon grid size-8 shrink-0 place-items-center rounded-full text-xl font-normal">+</span>
                </summary>
                <p className="max-w-2xl pt-4 pe-10 text-sm leading-7 text-ink-soft">{item.answer}</p>
              </details>
            ))}
            <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4" href="#how-it-works">
              {text.footerFaq}<ArrowIcon />
            </a>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-line px-5 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-16">
          <p>{text.footerLine}</p>
          <div className="flex items-center gap-5">
            <span>{text.footerLocation}</span>
            <span className="font-semibold tracking-[-0.08em] text-ink">gigs<span className="text-accent-gradient">.</span></span>
          </div>
        </footer>
      </div>
    </main>
  );
}
