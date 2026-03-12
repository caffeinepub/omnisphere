import { useEffect, useRef, useState } from "react";

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

interface Props {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseHeadings(html: string): TocItem[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  const items: TocItem[] = [];
  const exec = () => regex.exec(html);
  let m = exec();
  while (m !== null) {
    const level = Number.parseInt(m[1]);
    const rawText = m[2].replace(/<[^>]*>/g, "").trim();
    const slug = slugify(rawText);
    if (slug && rawText) {
      items.push({ level, text: rawText, slug });
    }
    m = exec();
  }
  return items;
}

export function TableOfContents({ content }: Props) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const headings = parseHeadings(content);

  // Inject IDs into DOM headings
  useEffect(() => {
    if (headings.length === 0) return;
    const articleEl = document.querySelector(".article-content");
    if (!articleEl) return;

    const domHeadings = articleEl.querySelectorAll("h2, h3");
    const usedSlugs: Record<string, number> = {};

    for (const el of Array.from(domHeadings)) {
      const rawText = el.textContent?.trim() ?? "";
      let slug = slugify(rawText);
      if (usedSlugs[slug] !== undefined) {
        usedSlugs[slug]++;
        slug = `${slug}-${usedSlugs[slug]}`;
      } else {
        usedSlugs[slug] = 0;
      }
      el.id = slug;
    }
  }, [headings.length]);

  // IntersectionObserver for active highlight
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    const articleEl = document.querySelector(".article-content");
    if (articleEl) {
      const domHeadings = articleEl.querySelectorAll("h2, h3");
      for (const el of Array.from(domHeadings)) {
        observerRef.current?.observe(el);
      }
    }

    return () => observerRef.current?.disconnect();
  }, [headings.length]);

  if (headings.length === 0) return null;

  const handleClick = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSlug(slug);
    }
    setMobileOpen(false);
  };

  const TocList = () => (
    <ul className="space-y-0.5">
      {headings.map((item) => (
        <li key={item.slug} className={item.level === 3 ? "pl-4" : ""}>
          <button
            type="button"
            onClick={() => handleClick(item.slug)}
            className={`w-full text-left text-sm py-1.5 px-2 rounded transition-all duration-200 leading-snug ${
              activeSlug === item.slug
                ? "text-primary font-semibold bg-primary/8"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            {item.text}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible accordion above article */}
      <div
        className="md:hidden mb-6 rounded-xl border border-border bg-card overflow-hidden"
        data-ocid="toc.panel"
      >
        <button
          type="button"
          onClick={() => setMobileOpen((p) => !p)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground"
          data-ocid="toc.toggle"
        >
          <span>Table of Contents</span>
          <span
            className={`transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        {mobileOpen && (
          <div className="px-2 pb-3 border-t border-border">
            <TocList />
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside
        className="hidden md:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
        data-ocid="toc.section"
      >
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
            Contents
          </p>
          <TocList />
        </div>
      </aside>
    </>
  );
}
