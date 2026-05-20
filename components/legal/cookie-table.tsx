import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Category = "necessary" | "analytics";

interface Row {
  name: ReactNode;
  storage: ReactNode;
  setBy: ReactNode;
  lifetime: ReactNode;
  purpose: ReactNode;
  category: Category;
  categoryLabel: string;
}

const ROWS: Row[] = [
  {
    name: <code className="font-mono text-foreground">cookieConsent</code>,
    storage: (
      <code className="font-mono text-xs text-foreground">localStorage</code>
    ),
    setBy: "OptimizeDeals (cookie banner)",
    lifetime: "Until cleared by you",
    purpose: (
      <>
        Stores your cookie choice (
        <code className="font-mono text-xs text-foreground">accepted</code> or{" "}
        <code className="font-mono text-xs text-foreground">declined</code>) so
        the banner is not shown again.
      </>
    ),
    category: "necessary",
    categoryLabel: "Necessary",
  },
  {
    name: <code className="font-mono text-foreground">_ga</code>,
    storage: "Cookie",
    setBy: "Google Analytics 4",
    lifetime: "2 years",
    purpose:
      "Anonymous client identifier used to distinguish unique visitors.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: (
      <code className="font-mono text-foreground">
        _ga_&lt;container-id&gt;
      </code>
    ),
    storage: "Cookie",
    setBy: "Google Analytics 4",
    lifetime: "2 years",
    purpose:
      "Persists session state for the GA4 property associated with our analytics property.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: <code className="font-mono text-foreground">_gid</code>,
    storage: "Cookie",
    setBy: "Google Analytics 4 (when configured)",
    lifetime: "24 hours",
    purpose:
      "Distinguishes users for short-term reporting. Not always present in GA4 deployments.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: (
      <span className="font-mono text-foreground">
        <code>_gat</code> / <code>_gat_gtag_&lt;id&gt;</code>
      </span>
    ),
    storage: "Cookie",
    setBy: "Google Analytics 4",
    lifetime: "1 minute",
    purpose: "Throttles request rate to Google Analytics.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: <code className="font-mono text-foreground">_gcl_au</code>,
    storage: "Cookie",
    setBy: "Google Tag Manager / Google Ads conversion linker",
    lifetime: "90 days",
    purpose:
      "Stores conversion attribution information for tags configured inside GTM. Only present if such tags are active.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: "Tags configured inside GTM",
    storage: (
      <>
        Cookie /{" "}
        <code className="font-mono text-xs text-foreground">localStorage</code>
      </>
    ),
    setBy: "Google Tag Manager container",
    lifetime: "Varies per tag",
    purpose:
      "GTM itself does not set tracking cookies, but tags configured inside the container may set additional storage. Any tag we add will be documented here.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: <code className="font-mono text-foreground">_clck</code>,
    storage: "Cookie",
    setBy: "Microsoft Clarity",
    lifetime: "13 months",
    purpose:
      "Stores the Clarity user ID and preferences to enable session recording and behavioral analytics.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: <code className="font-mono text-foreground">_clsk</code>,
    storage: "Cookie",
    setBy: "Microsoft Clarity",
    lifetime: "1 day",
    purpose:
      "Regulates request rate and stores session-level page view data for replay functionality.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: <code className="font-mono text-foreground">CLID</code>,
    storage: (
      <code className="font-mono text-xs text-foreground">localStorage</code>
    ),
    setBy: "Microsoft Clarity",
    lifetime: "Persistent",
    purpose:
      "Cross-session user identifier used by Clarity to correlate visits from the same user.",
    category: "analytics",
    categoryLabel: "Analytics",
  },
  {
    name: "Vercel Analytics ping data",
    storage: "None (cookieless)",
    setBy: "Vercel Analytics (production only)",
    lifetime: "N/A",
    purpose:
      "Aggregated, anonymous page-view counts. No identifiers are written to your browser.",
    category: "necessary",
    categoryLabel: "Necessary",
  },
];

const CATEGORY_STYLES: Record<Category, string> = {
  necessary: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  analytics: "bg-amber-500/10 text-amber-200 border-amber-500/30",
};

const COL_HEAD =
  "text-left text-[11px] font-mono uppercase tracking-[0.12em] text-brand-gray font-semibold px-5 py-4 bg-card/85 backdrop-blur-sm border-b border-border/60";

const COLUMNS = [
  { label: "Name", className: "min-w-40" },
  { label: "Storage", className: "min-w-28 whitespace-nowrap" },
  { label: "Set by", className: "min-w-48" },
  { label: "Lifetime", className: "min-w-24 whitespace-nowrap" },
  { label: "Purpose", className: "min-w-64" },
  { label: "Category", className: "min-w-32 whitespace-nowrap" },
];

export function CookieTable() {
  return (
    <div className="not-prose my-12 -mx-6 sm:mx-0 lg:-mx-32 xl:-mx-56 2xl:-mx-72">
      <div className="rounded-2xl border border-border/60 bg-card/30 shadow-xl shadow-black/30 overflow-hidden">
        {/* Caption strip */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border/60 bg-card/50">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400/80 animate-pulse" />
            <h3 className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground">
              Persistent data inventory
            </h3>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-brand-gray">
            {ROWS.length} entries
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead className="sticky top-0 z-10">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className={cn(COL_HEAD, col.className)}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => {
                const last = idx === ROWS.length - 1;
                const cellBase = cn(
                  "px-5 py-5 align-top text-muted-foreground leading-relaxed",
                  !last && "border-b border-border/40",
                );
                return (
                  <tr
                    key={idx}
                    className="group transition-colors hover:bg-accent/5 even:bg-card/20"
                  >
                    <td
                      className={cn(
                        cellBase,
                        "text-foreground font-medium relative",
                      )}
                    >
                      <span className="absolute left-0 top-5 bottom-5 w-px bg-transparent group-hover:bg-accent/60 transition-colors" />
                      <div className="break-words">{row.name}</div>
                    </td>
                    <td className={cellBase}>{row.storage}</td>
                    <td className={cellBase}>{row.setBy}</td>
                    <td className={cn(cellBase, "whitespace-nowrap")}>
                      {row.lifetime}
                    </td>
                    <td className={cellBase}>{row.purpose}</td>
                    <td className={cn(cellBase, "whitespace-nowrap")}>
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 text-[11px] font-mono rounded-full border",
                          CATEGORY_STYLES[row.category],
                        )}
                      >
                        {row.categoryLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 border-t border-border/60 bg-card/40">
          <span className="text-[11px] font-mono uppercase tracking-wider text-brand-gray">
            Legend
          </span>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-400" />
            Strictly necessary
          </span>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-amber-400" />
            Analytics · consent required
          </span>
          <span className="ml-auto text-[11px] font-mono uppercase tracking-wider text-brand-gray hidden md:inline">
            Scroll horizontally →
          </span>
        </div>
      </div>
    </div>
  );
}
