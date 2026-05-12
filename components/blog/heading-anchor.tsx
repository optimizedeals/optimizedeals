"use client";

import { Link as LinkIcon } from "lucide-react";

interface HeadingAnchorProps {
  id: string;
  level: 2 | 3 | 4;
  children: React.ReactNode;
}

export function HeadingAnchor({ id, level, children }: HeadingAnchorProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    window.history.replaceState(null, "", `#${id}`);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const headingClass = {
    2: "group text-2xl md:text-3xl font-medium text-[#F0F5FB] mt-12 mb-6 scroll-mt-24",
    3: "group text-xl md:text-2xl font-medium text-[#F0F5FB] mt-10 mb-4 scroll-mt-24",
    4: "group text-lg font-medium text-[#F0F5FB] mt-8 mb-3 scroll-mt-24",
  }[level];

  const inner = (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className="group/anchor relative inline-flex items-baseline gap-2 no-underline break-words"
      aria-label="Link to this section"
    >
      <span
        aria-hidden="true"
        className="hidden md:inline absolute -left-6 top-0 text-[#3B80EC]/0 group-hover:text-[#3B80EC]/40 group-hover/anchor:text-[#3B80EC] transition-colors select-none"
      >
        #
      </span>
      <span className="min-w-0 break-words">{children}</span>
      <LinkIcon
        aria-hidden="true"
        size={18}
        strokeWidth={2}
        className="shrink-0 self-center opacity-0 group-hover:opacity-40 group-hover/anchor:opacity-100 text-[#3B80EC] transition-opacity"
      />
    </a>
  );

  if (level === 2)
    return (
      <h2 id={id} className={headingClass}>
        {inner}
      </h2>
    );
  if (level === 3)
    return (
      <h3 id={id} className={headingClass}>
        {inner}
      </h3>
    );
  return (
    <h4 id={id} className={headingClass}>
      {inner}
    </h4>
  );
}
