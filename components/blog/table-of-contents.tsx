"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`,
    );
    if (!active) return;
    const container = listRef.current;
    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;
    const aTop = active.offsetTop;
    const aBottom = aTop + active.offsetHeight;
    if (aTop < cTop || aBottom > cBottom) {
      container.scrollTo({
        top: aTop - container.clientHeight / 2 + active.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  useEffect(() => {
    // Get all headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = Array.from(elements).map((element) => {
      const label =
        element.querySelector<HTMLElement>("a > span:not([aria-hidden='true'])")
          ?.textContent ??
        element.textContent ??
        "";
      return {
        id: element.id,
        text: label,
        level: element.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(items);

    // Set up intersection observer for active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -80% 0%",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="flex flex-col p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl max-h-[calc(100vh-7rem)]">
      <h3 className="text-xs font-mono text-[#585F78] uppercase tracking-wider mb-4 shrink-0">
        On This Page
      </h3>
      <ul
        ref={listRef}
        className="space-y-2 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-[#002A6B] scrollbar-track-transparent"
      >
        {headings.map((heading) => (
          <li
            key={heading.id}
            data-toc-id={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-colors duration-200 py-1",
                activeId === heading.id
                  ? "text-[#3B80EC]"
                  : "text-[#7A8BA7] hover:text-[#F0F5FB]",
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const top =
                    element.getBoundingClientRect().top +
                    window.scrollY -
                    96;
                  window.scrollTo({ top, behavior: "smooth" });
                  window.history.replaceState(null, "", `#${heading.id}`);
                }
              }}
            >
              {heading.text.replaceAll("#", "").trim()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
