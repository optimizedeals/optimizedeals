"use client";

import { useState } from "react";
import { Link2, Mail, Check } from "lucide-react";
import {
  siX,
  siFacebook,
  siReddit,
  siYcombinator,
  siWhatsapp,
  siTelegram,
  siBluesky,
} from "simple-icons";
import { SimpleIcon } from "@/components/icons/simple-icon";

interface ShareRowProps {
  title: string;
  url: string;
}

/**
 * Icon-only social share row. Each link opens an intent URL in a new tab.
 * Uses simple-icons brand glyphs and falls back to lucide where simple-icons
 * does not provide a glyph (LinkedIn was removed for trademark reasons).
 */
export function ShareRow({ title, url }: ShareRowProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const targets = [
    {
      key: "x",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      render: () => <SimpleIcon icon={siX} size={16} color="currentColor" />,
    },
    {
      key: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      render: () => (
        // simple-icons does not ship LinkedIn (trademark). Inline the path.
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill="currentColor"
          aria-label="LinkedIn"
        >
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      key: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      render: () => (
        <SimpleIcon icon={siFacebook} size={16} color="currentColor" />
      ),
    },
    {
      key: "reddit",
      label: "Share on Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      render: () => (
        <SimpleIcon icon={siReddit} size={16} color="currentColor" />
      ),
    },
    {
      key: "hackernews",
      label: "Share on Hacker News",
      href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`,
      render: () => (
        <SimpleIcon icon={siYcombinator} size={16} color="currentColor" />
      ),
    },
    {
      key: "bluesky",
      label: "Share on Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
      render: () => (
        <SimpleIcon icon={siBluesky} size={16} color="currentColor" />
      ),
    },
    {
      key: "whatsapp",
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      render: () => (
        <SimpleIcon icon={siWhatsapp} size={16} color="currentColor" />
      ),
    },
    {
      key: "telegram",
      label: "Share on Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      render: () => (
        <SimpleIcon icon={siTelegram} size={16} color="currentColor" />
      ),
    },
    {
      key: "email",
      label: "Share via email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      render: () => <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {targets.map((t) => (
        <a
          key={t.key}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.label}
          title={t.label}
          className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-accent hover:bg-card/30 transition-colors"
        >
          {t.render()}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-accent hover:bg-card/30 transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
