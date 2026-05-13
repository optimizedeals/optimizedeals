import * as cheerio from "cheerio";
import TurndownService from "turndown";

export interface ConvertOptions {
  url: string;
  generatedAt?: string;
}

export interface ConvertResult {
  markdown: string;
  meta: {
    title: string;
    description: string;
    canonical: string;
    image?: string;
    section?: string;
    publishedAt?: string;
    author?: string;
  };
}

const NOISE_SELECTORS = [
  "script",
  "style",
  "noscript",
  "iframe",
  "nav",
  "header",
  "footer",
  "[aria-hidden='true']",
  "[role='presentation']",
  "[role='dialog']",
  "[role='alertdialog']",
  "[role='banner']",
  "[role='navigation']",
  "[role='contentinfo']",
  "[data-llm-exclude='true']",
  "[data-cookie-consent]",
  "[data-slot='avatar-fallback']",
  "[data-slot='avatar-image']",
  ".sr-only",
  "template",
  "[data-slot='button']",
  ".cookie-consent",
  ".fixed.z-\\[200\\]",
  "[class*='cookie']",
  "[id*='cookie']",
];

const EYEBROW_CLASS_TOKENS = ["font-mono", "uppercase", "tracking-wider"];

const HTML_ENTITY_MAP: Record<string, string> = {
  "&apos;": "'",
  "&quot;": '"',
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
  "&#39;": "'",
  "&#x27;": "'",
  "&hellip;": "…",
  "&mdash;": "—",
  "&ndash;": "–",
};

function decodeEntities(text: string): string {
  let out = text;
  for (const [entity, char] of Object.entries(HTML_ENTITY_MAP)) {
    out = out.split(entity).join(char);
  }
  out = out.replace(/&#(\d+);/g, (_, code) =>
    String.fromCodePoint(Number(code)),
  );
  out = out.replace(/&#x([0-9a-f]+);/gi, (_, code) =>
    String.fromCodePoint(parseInt(code, 16)),
  );
  return out;
}

function buildTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "_",
    linkStyle: "inlined",
  });

  td.remove(["script", "style", "noscript", "iframe"]);

  td.addRule("strip-llm-exclude", {
    filter: (node) =>
      (node as Element).getAttribute?.("data-llm-exclude") === "true",
    replacement: () => "",
  });

  td.addRule("strip-aria-hidden", {
    filter: (node) =>
      (node as Element).getAttribute?.("aria-hidden") === "true",
    replacement: () => "",
  });

  td.addRule("strip-presentation", {
    filter: (node) =>
      (node as Element).getAttribute?.("role") === "presentation",
    replacement: () => "",
  });

  td.addRule("unwrap-anchor-heading", {
    filter: (node) => {
      if (!/^H[1-6]$/.test(node.nodeName)) return false;
      const children = (node as Element).childNodes;
      if (!children || children.length !== 1) return false;
      return children[0]?.nodeName === "A";
    },
    replacement: (content, node) => {
      const level = Number(node.nodeName.charAt(1));
      const hashes = "#".repeat(level);
      return `\n\n${hashes} ${content.trim()}\n\n`;
    },
  });

  td.addRule("button", {
    filter: (node) => node.nodeName === "BUTTON",
    replacement: () => "",
  });

  td.addRule("svg", {
    filter: (node) => node.nodeName === "SVG" || node.nodeName === "svg",
    replacement: () => "",
  });

  td.addRule("unwrap-card-anchor", {
    filter: (node) => {
      if (node.nodeName !== "A") return false;
      const el = node as Element;
      if (!el.querySelector) return false;
      return !!el.querySelector("h1, h2, h3, h4, h5, h6");
    },
    replacement: (content, node) => {
      const href = (node as Element).getAttribute?.("href") ?? "";
      const trimmed = content.trim();
      if (!trimmed) return "";
      if (!href) return `\n\n${trimmed}\n\n`;
      return `\n\n${trimmed}\n\n[Read more](${href})\n\n`;
    },
  });

  td.addRule("img-meaningful", {
    filter: "img",
    replacement: (_content, node) => {
      const el = node as HTMLImageElement;
      const alt = (el.getAttribute?.("alt") ?? "").trim();
      const src = el.getAttribute?.("src") ?? "";
      if (!alt || !src) return "";
      if (src.startsWith("data:")) return "";
      return `![${alt}](${src})`;
    },
  });

  td.addRule("strip-hidden-wrapper", {
    filter: (node) => {
      if (node.nodeName !== "DIV") return false;
      const el = node as Element;
      const style = el.getAttribute?.("style") ?? "";
      const childCount = el.childNodes?.length ?? 0;
      if (childCount > 1) return false;
      if (
        style.includes("opacity:0") ||
        style.includes("opacity: 0") ||
        style.includes("visibility:hidden") ||
        style.includes("visibility: hidden")
      ) {
        return true;
      }
      return false;
    },
    replacement: (_content, node) => {
      const el = node as Element;
      const inner = el.innerHTML ?? "";
      if (!inner.trim()) return "";
      return inner;
    },
  });

  td.addRule("strip-animate-pulse", {
    filter: (node) => {
      if (!(node as Element).getAttribute) return false;
      const cls = (node as Element).getAttribute?.("class") ?? "";
      if (cls.includes("animate-pulse")) return true;
      return false;
    },
    replacement: () => "",
  });

  td.addRule("unwrap-link-button", {
    filter: (node) => {
      if (node.nodeName !== "A") return false;
      const el = node as Element;
      if (!el.getAttribute) return false;
      const href = el.getAttribute("href") ?? "";
      const cls = el.getAttribute("class") ?? "";
      if (cls.includes("data-slot") || cls.includes("inline-flex")) {
        const text = el.textContent?.trim() ?? "";
        if (text.length < 80 && text.length > 0) {
          return true;
        }
      }
      return false;
    },
    replacement: (content, node) => {
      const el = node as Element;
      const href = el.getAttribute?.("href") ?? "";
      const text = content.trim();
      if (!text || !href) return "";
      return `\n\n[${text}](${href})\n\n`;
    },
  });

  return td;
}

export function htmlToMarkdown(
  html: string,
  opts: ConvertOptions,
): ConvertResult {
  const $ = cheerio.load(html);

  const meta = extractMeta($, opts.url);

  // Decode HTML entities in meta before building frontmatter
  meta.title = decodeEntities(meta.title);
  meta.description = decodeEntities(meta.description);

  for (const sel of NOISE_SELECTORS) {
    try {
      $(sel).remove();
    } catch {
      // Skip invalid selectors
    }
  }

  // Strip React comment nodes <!-- --> from full HTML
  $("*")
    .contents()
    .each((_i, el) => {
      if (el.type === "comment") {
        $(el).remove();
      }
    });

  // Pick main content container
  let $root = $("main").first();
  if (!$root.length) $root = $("article").first();
  if (!$root.length) $root = $("body").first();

  preProcess($root, $);

  // Decode entities in root HTML before turndown
  let rootHtml = decodeEntities($root.html() ?? "");

  // Demote h1→h2 — the frontmatter title is the sole h1 per page
  rootHtml = rootHtml.replace(/<h1\b[^>]*>/gi, (m) => m.replace("h1", "h2"));
  rootHtml = rootHtml.replace(/<\/h1>/gi, "</h2>");

  const td = buildTurndown();
  let body = td.turndown(rootHtml);



  body = postProcess(body, meta.title);

  const frontmatter = buildFrontmatter(
    meta,
    opts.generatedAt ?? new Date().toISOString(),
  );

  return {
    markdown: `${frontmatter}\n\n${body}\n`,
    meta,
  };
}

function extractMeta(
  $: cheerio.CheerioAPI,
  url: string,
): ConvertResult["meta"] {
  const get = (sel: string, attr = "content") =>
    $(sel).attr(attr)?.trim() ?? "";

  const ogTitle = get("meta[property='og:title']");
  const docTitle = $("title").text().trim();
  const title = decodeEntities(ogTitle || docTitle);
  const description = decodeEntities(
    get("meta[name='description']") || get("meta[property='og:description']"),
  );
  const canonical = get("link[rel='canonical']", "href") || url;
  const image = get("meta[property='og:image']");
  const section = decodeEntities(
    get("meta[property='article:section']") || get("meta[name='category']"),
  );
  const publishedAt =
    get("meta[property='article:published_time']") ||
    get("meta[itemprop='datePublished']");
  const author = decodeEntities(
    get("meta[name='author']") || get("meta[property='article:author']"),
  );

  return { title, description, canonical, image, section, publishedAt, author };
}

function preProcess($root: cheerio.Cheerio<any>, $: cheerio.CheerioAPI): void {
  // Heuristic eyebrow detector: short uppercase mono-font label, often duplicates
  // the next H2. Marketing sections use the same Tailwind class signature for these.
  $root.find("span, p, div").each((_i, el) => {
    const $el = $(el);
    if ($el.children().length > 0) return;
    const cls = $el.attr("class") ?? "";
    const matches = EYEBROW_CLASS_TOKENS.every((token) => cls.includes(token));
    if (!matches) return;
    const text = $el.text().trim();
    if (!text || text.length > 60) return;
    if (/[.!?;:]/.test(text)) return;
    $el.attr("data-llm-eyebrow", "true");
  });

  // Heuristic decorative numeric badges (01, 02, 1, 2, …) rendered as standalone
  // <span>/<div>/<p> with no children and no real content.
  // Also handle React-textnode-split numbers like "0<!-- -->1"
  $root.find("span, div, p").each((_i, el) => {
    const $el = $(el);
    if ($el.children().length > 0) return;
    const text = $el.text().trim();
    if (/^0?\d{1,2}$/.test(text)) {
      $el.attr("data-llm-decoration", "true");
    }
  });

  // Strip decorative badge dots and animated pulse elements
  $root.find("[class*='animate-pulse']").each((_i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (!text) $el.remove();
  });

  // Strip architecture diagram containers (aspect-video with diagram labels)
  $root.find("div").each((_i, el) => {
    const $el = $(el);
    const cls = $el.attr("class") ?? "";
    if (cls.includes("aspect-video")) {
      const svgCount = $el.find("svg").length;
      const labels = $el.find("span, div, p").filter((_, c) => {
        const $c = $(c);
        if ($c.children().length > 0) return false;
        const t = $c.text().trim();
        return t.length > 0 && t.length < 40 && /^[A-Z]/.test(t);
      }).length;
      if (svgCount >= 2 && labels >= 2) {
        $el.remove();
        return;
      }
    }
  });

  // Strip marketing badges: inline-flex pills with icons serving as page metadata
  $root.find("div").each((_i, el) => {
    const $el = $(el);
    const cls = $el.attr("class") ?? "";
    if (
      cls.includes("inline-flex") &&
      cls.includes("rounded-full") &&
      cls.includes("px-4") &&
      cls.includes("py-2")
    ) {
      const text = $el.text().trim();
      if (text && text.length < 50 && !text.includes("\n")) {
        $el.remove();
      }
    }
  });

  // Strip empty elements that are just visual separators
  $root.find("span, div, p, li").each((_i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const inner = $el.children().length;
    if (inner === 0 && !text) {
      $el.remove();
    }
  });

  // Insert separator between adjacent inline span chips that would otherwise
  // concatenate (e.g. "AIRAGTool Calling" or "AI EngineeringFeatured").
  $root.find("span + span").each((_i, el) => {
    const $el = $(el);
    if ($el.children().length > 0) return;
    const text = $el.text();
    if (!text || /^[\s,;·•|/]/.test(text)) return;
    const $prev = $el.prev();
    if (!$prev.length || $prev.children().length > 0) return;
    const prevText = $prev.text();
    if (!prevText || /[\s,;·•|/]$/.test(prevText)) return;
    // Use cheerio's text node insertion instead of document.createTextNode
    $el.before(" ");
    $el.text(" " + text);
  });

  // Heuristic stat tiles: a centered div containing an SVG (icon), a value, and a label.
  // Detect by looking for divs with 2-3 children where first is SVG, rest are text divs.
  $root.find("div.text-center").each((_i, el) => {
    const $el = $(el);
    const style = $el.attr("style") ?? "";
    // Skip if it has no text content after stripping SVGs
    const clone = $el.clone();
    clone.find("svg, [aria-hidden]").remove();
    const text = clone.text().trim();
    if (!text) return;

    const children = $el.children("div");
    if (children.length !== 2) return;

    const value = $(children[0]).text().trim();
    const label = $(children[1]).text().trim();
    if (value && label) {
      $el.replaceWith(
        `<li data-stat="true"><strong>${value}</strong> — ${label}</li>`,
      );
    }
  });

  // Wrap stat lists: consecutive stat items should be wrapped in <ul>
  let foundStats = false;
  $root.find("[data-stat]").each(() => {
    foundStats = true;
  });
  if (foundStats) {
    $root.find("[data-stat]").each((_i, el) => {
      const $el = $(el);
      const $prev = $el.prev();
      if (!$prev.length || !$prev.is("[data-stat]")) {
        // Start of a stat group; wrap in bullet list
        const wrapper = $("<ul>").addClass("llm-stats");
        $el.before(wrapper);
        wrapper.append($el);
      } else {
        const $prevUl = $el.prevAll("ul.llm-stats").first();
        if ($prevUl.length) $prevUl.append($el);
      }
    });
    // Remove the data-stat attribute
    $root.find("[data-stat]").removeAttr("data-stat");
  }

  // Heuristic tag-chip groups: a flex-wrap container whose children are all
  // short text spans (no nested structure) — collapse into a single inline list.
  $root.find("div").each((_i, el) => {
    const $el = $(el);
    const cls = $el.attr("class") ?? "";
    if (!cls.includes("flex-wrap") && !cls.includes("flex-row")) return;
    const children = $el.children();
    if (children.length < 2 || children.length > 12) return;
    let allChips = true;
    const items: string[] = [];
    children.each((_j, c) => {
      const node = c as { tagName?: string };
      const tag = (node.tagName ?? "").toLowerCase();
      if (tag !== "span") {
        allChips = false;
        return;
      }
      const $c = $(c);
      if ($c.children().length > 0) {
        allChips = false;
        return;
      }
      const t = $c.text().trim();
      if (!t || t.length > 60) {
        allChips = false;
        return;
      }
      items.push(t);
    });
    if (!allChips || items.length !== children.length) return;
    const unique = Array.from(new Set(items));
    $el.replaceWith(`<p>${unique.join(", ")}</p>`);
  });

  // Eyebrow labels: drop entirely (decorative section tags)
  $root.find("[data-llm-eyebrow='true']").remove();

  // Status badges: prepend bracketed prefix to next heading, drop self
  $root.find("[data-llm-status='true']").each((_i, el) => {
    const text = $(el).text().trim();
    if (!text) {
      $(el).remove();
      return;
    }
    let $next = $(el).next();
    while ($next.length && !/^H[1-6]$/i.test($next[0].tagName ?? "")) {
      $next = $next.next();
    }
    if ($next.length) {
      const heading = $next.text().trim();
      $next.text(`[${text}] ${heading}`);
    }
    $(el).remove();
  });

  // Tag chip containers: join children with ", "
  $root.find("[data-llm-tags='true']").each((_i, el) => {
    const items: string[] = [];
    $(el)
      .find("> *")
      .each((_j, child) => {
        const t = $(child).text().trim();
        if (t) items.push(t);
      });
    if (!items.length) {
      const flat = $(el).text().trim();
      if (flat) items.push(flat);
    }
    if (items.length) {
      const unique = Array.from(new Set(items));
      $(el).replaceWith(`<p><strong>Stack:</strong> ${unique.join(", ")}</p>`);
    } else {
      $(el).remove();
    }
  });

  // Stat tiles: render inline as list items
  $root.find("[data-llm-stat]").each((_i, el) => {
    const $el = $(el);
    const value =
      $el.find("[data-llm-stat-value]").text().trim() ||
      $el.find("> *").first().text().trim();
    const label =
      $el.find("[data-llm-stat-label]").text().trim() ||
      $el.find("> *").eq(1).text().trim();
    if (value && label) {
      $el.replaceWith(`<li><strong>${value}</strong> — ${label}</li>`);
    } else if (value) {
      $el.replaceWith(`<li>${value}</li>`);
    } else {
      $el.remove();
    }
  });

  // Wrap stat groups in <ul>
  $root.find("[data-llm-stats='true']").each((_i, el) => {
    const $el = $(el);
    const html = $el.html() ?? "";
    if (html.includes("<li>")) {
      $el.replaceWith(`<ul>${html}</ul>`);
    }
  });

  // Decorative numbered badges (01, 02, "1", etc) marked explicitly
  $root.find("[data-llm-decoration='true']").remove();

  // Author avatars: keep only displayed name
  $root.find("[data-llm-author]").each((_i, el) => {
    const name = $(el).attr("data-llm-author")?.trim();
    if (name) $(el).replaceWith(`<span>${name}</span>`);
    else $(el).remove();
  });

  // Remove empty heading elements (no text content — decorative only)
  $root.find("h1, h2, h3, h4, h5, h6").each((_i, el) => {
    const $el = $(el);
    // Also strip child elements that have no text (e.g. <br>, empty <span>)
    $el.find("*").each((_j, child) => {
      const $child = $(child);
      if (!$child.text().trim()) $child.remove();
    });
    if (!$el.text().trim()) $el.remove();
  });

  // Empty divs/spans (after stripping aria-hidden children)
  $root.find("div, span, p").each((_i, el) => {
    const $el = $(el);
    if (
      !$el.text().trim() &&
      !$el.find("img, a, br, hr, ul, ol, table, pre, code").length
    )
      $el.remove();
  });

  // Dedupe consecutive identical text nodes (logo marquees triple-rendered)
  dedupeRepeatedSiblings($root, $);
}

function dedupeRepeatedSiblings(
  $root: cheerio.Cheerio<any>,
  $: cheerio.CheerioAPI,
): void {
  // Only deduplicate consecutive identical leaf nodes within the same parent.
  // This targets logo marquees but avoids removing repeated headings across sections.
  const seen = new Set<string>();
  $root.find("*").each((_i, el) => {
    const $el = $(el);
    const parent = $el.parent();
    if (!parent.length) return;
    const tag = (el as { tagName?: string }).tagName ?? "";
    if (/^H[1-6]$/i.test(tag)) return;
    if ($el.children().length > 0) return;
    const text = $el.text().trim();
    if (!text || text.length >= 80) return;
    const prev = $el.prev();
    if (!prev.length) return;
    const prevTag =
      (prev[0] as { tagName?: string } | undefined)?.tagName ?? "";
    const prevText = prev.text().trim();
    if (prevTag === tag && prevText === text) {
      $el.remove();
    }
  });
}

function postProcess(md: string, title: string): string {
  let out = md;

  // Strip "Copy" / "jsonCopy" leakage from code-block buttons
  out = out.replace(/^[a-z]*Copy\s*$/gim, "");
  out = out.replace(/\n[A-Za-z]+Copy\n/g, "\n");

  // Drop standalone numeric badge lines (01, 02, ..., or single-digit list ordinals)
  // including those that may have whitespace-only wrap
  out = out.replace(/^\s*0?\d{1,2}\s*$/gm, "");

  // Drop leftover "Read article" / "Read" / "Visit" decorative CTAs at end of cards
  out = out.replace(/^\s*(Read article|Read|Visit)\s*$/gim, "");

  // Drop "Book a Call", "Get in Touch", "Start a Project" standalone lines
  // (navigation CTAs that leak through)
  out = out.replace(
    /^\s*(Book a Call|Get in Touch|Start a Project|Start a Conversation|Book a Discovery Call|Explore Labs|Explore Systems)\s*$/gim,
    "",
  );

  // Strip raw HTML tags that survived turndown conversion
  // (cheerio DOM modifications can produce malformed fragments)
  out = out.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  out = out.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");
  out = out.replace(/<path[^>]*\/?>/gi, "");
  out = out.replace(/<rect[^>]*\/?>/gi, "");
  out = out.replace(/<ellipse[^>]*\/?>/gi, "");
  out = out.replace(/<line[^>]*\/?>/gi, "");
  out = out.replace(/<circle[^>]*\/?>/gi, "");
  out = out.replace(/<defs>[\s\S]*?<\/defs>/gi, "");
  out = out.replace(/<pattern[^>]*>[\s\S]*?<\/pattern>/gi, "");
  out = out.replace(/<stop[^>]*\/?>/gi, "");
  out = out.replace(/<linearGradient[^>]*>[\s\S]*?<\/linearGradient>/gi, "");
  out = out.replace(/<title>[^<]*<\/title>/gi, "");
  out = out.replace(/<br\s*\/?>/gi, "\n");

  // Strip raw block-level HTML tags that should have been converted by turndown
  out = out.replace(
    /<\/?(div|span|h[1-6]|p|ul|ol|li|section|main|article|aside|form|button|input|select|label|header|footer|nav|blockquote|pre|code|table|thead|tbody|tr|th|td|dl|dt|dd)[^>]*>/gi,
    "",
  );

  // Strip remaining <a> tags entirely (links should already be converted by turndown)
  out = out.replace(/<a\s[^>]*>/gi, "");
  out = out.replace(/<\/a>/gi, "");

  // Strip decorative section labels that are eyebrow-style
  // (e.g., "Live Products" as a standalone line before an H2)
  out = out.replace(
    /^\[?(Live Products|Experimental|Services|Technology|Solutions|Products|Resources|Company)\]?\s*$/gim,
    "",
  );

  // Drop architecture diagram labels that survive (Client, Edge, Origin, Data)
  // Only when they appear as isolated short lines
  out = out.replace(
    /^\s*(Client|Edge|Origin|Data|Architecture Overview)\s*$/gm,
    "",
  );

  // Fix concatenated text: add spaces between adjacent inline elements
  // that got merged during cheerio DOM unwrapping
  // Pattern: lowercaseLetter followed by CapitalLetter (word boundary within words)
  out = out.replace(/([a-z])([A-Z][a-z])/g, "$1 $2");

  // Fix concatenated headings: add newlines before headings that are merged with text.
  // IMPORTANT: preceding char ([^\n#]) must NOT be a hash to avoid splitting `##` into `#\n\n#`.
  out = out.replace(/([^\n#])(#{1,6}\s)/g, "$1\n\n$2");

  // Fix text merged with inline code backticks
  out = out.replace(/(\w)(`)/g, "$1 $2");
  out = out.replace(/(`)(\w)/g, "$1 $2");

  // Strip remaining empty bracket pairs and empty parens
  out = out.replace(/\(\)/g, "");

  // Collapse adjacent inline links onto separate lines
  out = out.replace(/\)\[/g, ")\n\n[");

  // Unwrap anchor-wrapped headings: `## [Foo](#foo)` → `## Foo`
  out = out.replace(/^(#{1,6})\s*\[([^\]]+)\]\(#[^)]*\)\s*$/gm, "$1 $2");

  // Remove empty bracket pairs left after badge stripping
  out = out.replace(/\[\s*\]/g, "");

  // Clean up excessive spacing around list items
  out = out.replace(/\n{3,}(?=\s*[-*]\s)/g, "\n\n");
  out = out.replace(/(?<=[-*]\s[^\n]*)\n{3,}/g, "\n\n");

  // Remove trailing "---" lines that are separators (keep frontmatter ones)
  out = out.replace(/^---\s*$/gm, "");

  // Remove ghost headings (empty heading markers on their own line)
  out = out.replace(/^#{1,6}\s*$/gm, "");

  // Collapse runs of blank lines
  out = out.replace(/\n{4,}/g, "\n\n\n");

  // Fix heading spacing: ensure blank line before headings
  out = out.replace(/([^\n])\n(?=#{1,6}\s)/g, "$1\n\n");

  // Inject H1 from title: if the title appears as a h2 heading, upgrade it to h1.
  // Otherwise prepend the title as h1 if no h1 exists.
  if (title) {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const asHeading = new RegExp(`^##\\s+${escaped}\\s*$`, "m");
    if (asHeading.test(out)) {
      out = out.replace(asHeading, `# ${title}`);
    } else if (!/^# /m.test(out)) {
      out = `# ${title}\n\n${out}`;
    }
  }

  return out.trim();
}

function buildFrontmatter(
  meta: ConvertResult["meta"],
  generatedAt: string,
): string {
  const lines: string[] = ["---"];
  if (meta.title) lines.push(`title: ${yamlString(meta.title)}`);
  if (meta.description)
    lines.push(`description: ${yamlString(meta.description)}`);
  if (meta.canonical) lines.push(`source: ${meta.canonical}`);
  if (meta.section) lines.push(`section: ${yamlString(meta.section)}`);
  if (meta.author) lines.push(`author: ${yamlString(meta.author)}`);
  if (meta.publishedAt) lines.push(`published: ${meta.publishedAt}`);
  if (meta.image) lines.push(`image: ${meta.image}`);
  lines.push(`generated: ${generatedAt}`);
  lines.push(`format: markdown`);
  lines.push(`llm_optimized: true`);
  lines.push("---");
  return lines.join("\n");
}

function yamlString(v: string): string {
  const escaped = v.replace(/"/g, '\\"').replace(/\n/g, " ");
  return `"${escaped}"`;
}
