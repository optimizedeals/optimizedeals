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
    // Get headings only from the MDX content scope, not sidebar/accordion children
    const scope =
      document.querySelector<HTMLElement>("article .mdx-content") ??
      document.querySelector("article");
    if (!scope) return;

    const elements = Array.from(
      scope.querySelectorAll<HTMLElement>(
        "h2[id], h3[id], [data-toc-anchor][id]",
      ),
    ).filter((el) => el.id && el.closest(".mdx-content") === scope);

    const items: TOCItem[] = elements.map((element) => {
      const tocText = element.dataset.tocText;
      const label =
        tocText ??
        element.querySelector<HTMLElement>("a > span:not([aria-hidden='true'])")
          ?.textContent ??
        element.textContent ??
        "";
      const level = element.tagName === "H2" ? 2 : 3;
      return {
        id: element.id,
        text: label,
        level,
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
                if (!element) return;
                // If target is a closed accordion item, open it first.
                const trigger = element.querySelector<HTMLElement>(
                  '[data-slot="accordion-trigger"]',
                );
                const wasClosed =
                  trigger?.getAttribute("data-state") === "closed";
                if (wasClosed) trigger?.click();
                const scroll = () => {
                  // scroll-mt-24 on the target supplies the 96px top offset.
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.replaceState(null, "", `#${heading.id}`);
                };
                if (wasClosed) {
                  // Wait for Radix expand animation (~200ms) before scrolling
                  // so the final position accounts for the expanded content.
                  window.setTimeout(scroll, 320);
                } else {
                  scroll();
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
