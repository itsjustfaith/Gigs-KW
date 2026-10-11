"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { copy, type Locale } from "@/lib/content";
import type { DemoPortfolioProject } from "@/lib/demo-listings";

type Filter = "all" | "completed" | "in-progress";
type BrowseCopy = (typeof copy)[Locale]["browse"];

const photos = {
  creative: {
    src: "/images/creative-workspace.jpg",
    photographer: "Rodrigo Rodrigues",
    url: "https://unsplash.com/photos/laptop-with-photo-editing-workspace-K8LBiiWuoA8",
  },
  video: {
    src: "/images/video-editing.jpg",
    photographer: "Grigorii Shcheglov",
    url: "https://unsplash.com/photos/laptop-set-up-for-video-editing-Zai_PqcdACg",
  },
  writing: {
    src: "/images/writing-desk.jpg",
    photographer: "Clay Banks",
    url: "https://unsplash.com/photos/open-notebook-with-pen-and-pencils-on-desk-n9AaeihA9HI",
  },
} as const;

export default function PortfolioProjects({
  locale,
  projects,
  text,
}: {
  locale: Locale;
  projects: DemoPortfolioProject[];
  text: BrowseCopy;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: text.portfolioAll },
    { id: "completed", label: text.portfolioCompleted },
    { id: "in-progress", label: text.portfolioInProgress },
  ];
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.status === filter);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const backwards = (event.key === "ArrowLeft" && locale !== "ar") || (event.key === "ArrowRight" && locale === "ar");
    const forwards = (event.key === "ArrowRight" && locale !== "ar") || (event.key === "ArrowLeft" && locale === "ar");
    const nextIndex = backwards
      ? (index - 1 + tabs.length) % tabs.length
      : forwards
        ? (index + 1) % tabs.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : -1;

    if (nextIndex < 0) return;
    event.preventDefault();
    setFilter(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <>
    <section aria-labelledby="portfolio-gallery-title" className="mt-12 border-t border-line pt-8 sm:mt-16 sm:pt-10">
      <h2 id="portfolio-gallery-title" className="text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">{text.portfolioGalleryTitle}</h2>
      <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const photo = photos[project.image];
          return (
            <details className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-white/70" key={`gallery:${project.title}`}>
              <summary className="cursor-pointer list-none marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                <span className="relative block aspect-[4/3] overflow-hidden bg-paper-dark"><Image alt="" className="object-cover" fill sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw" src={photo.src} /></span>
                <span className="flex items-center justify-between gap-3 p-4"><span className="min-w-0 break-words text-lg font-semibold">{project.title}</span><span aria-hidden="true" className="accent-glass grid size-10 shrink-0 place-items-center rounded-full"><svg className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" viewBox="0 0 20 20" fill="none"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg></span><span className="sr-only group-open:hidden">{text.portfolioExpand}</span><span className="sr-only hidden group-open:inline">{text.portfolioCollapse}</span></span>
              </summary>
              <div className="border-t border-line px-4 py-4"><p className="text-sm leading-6 text-ink-soft">{project.description}</p><p className="mt-3 text-xs text-ink-soft">{text.photoCredit} <a className="underline decoration-1 underline-offset-2" href={photo.url} rel="noreferrer" target="_blank">{photo.photographer} / Unsplash</a></p></div>
            </details>
          );
        })}
      </div>
    </section>
    <section aria-labelledby="projects-title" className="mt-12 border-t border-line pt-8 sm:mt-16 sm:pt-10">
      <h2 id="projects-title" className="text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">{text.portfolioTitle}</h2>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={text.portfolioTitle}>
        {tabs.map((tab, index) => {
          const selected = filter === tab.id;
          return (
            <button
              aria-label={tab.label}
              aria-controls="profile-projects-panel"
              aria-selected={selected}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "accent-glass border-transparent text-ink" : "border-line bg-white/60 hover:bg-white"}`}
              id={`project-filter-${tab.id}`}
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`project-filter-${filter}`}
        className="mt-4"
        id="profile-projects-panel"
        role="tabpanel"
        tabIndex={0}
      >
        {visibleProjects.length ? (
          <div className="grid min-w-0 gap-4 lg:grid-cols-2">
            {visibleProjects.map((project) => {
              const photo = photos[project.image];
              const status = project.status === "completed" ? text.portfolioCompleted : text.portfolioInProgress;
              return (
                <details className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-white/70" key={project.title}>
                  <summary className="cursor-pointer list-none marker:content-none focus-visible:rounded-2xl">
                    <span className="relative block aspect-[16/9] overflow-hidden bg-paper-dark">
                      <Image alt="" className="object-cover transition-transform duration-300 group-open:scale-[1.02] motion-reduce:transition-none" fill sizes="(min-width: 1024px) 42vw, 100vw" src={photo.src} />
                    </span>
                    <span className="flex min-w-0 items-start gap-3 p-4 sm:p-5">
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                          <span className="rounded-full border border-line px-3 py-1 font-semibold">{status}</span>
                          <span>{text.portfolioYear}: {project.year}</span>
                        </span>
                        <span className="mt-3 block break-words text-xl font-semibold leading-snug tracking-tight">{project.title}</span>
                      </span>
                      <span aria-hidden="true" className="accent-glass grid size-10 shrink-0 place-items-center rounded-full"><svg className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" viewBox="0 0 20 20" fill="none"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg></span>
                      <span className="sr-only group-open:hidden">{text.portfolioExpand}</span>
                      <span className="sr-only hidden group-open:inline">{text.portfolioCollapse}</span>
                    </span>
                  </summary>
                  <div className="border-t border-line px-4 py-4 sm:px-5">
                    <p className="text-sm leading-6 text-ink-soft">{project.description}</p>
                    <p className="mt-3 text-xs text-ink-soft">
                      {text.photoCredit} <a className="underline decoration-1 underline-offset-2" href={photo.url} rel="noreferrer" target="_blank">{photo.photographer} / Unsplash</a>
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-line bg-white/60 px-4 py-6 text-sm text-ink-soft" role="status">{text.portfolioEmpty}</p>
        )}
      </div>
    </section>
    </>
  );
}
