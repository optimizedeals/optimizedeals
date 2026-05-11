"use client";

import { useMemo } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Link as LinkIcon } from "lucide-react";
import { CodeBlock } from "./mdx-components/code-block";
import { Callout } from "./mdx-components/callout";
import { ArchitectureDiagram } from "./mdx-components/architecture-diagram";
import { MetricsCard } from "./mdx-components/metrics-card";
import { ArticleImage } from "./mdx-components/article-image";
import { QuoteBlock } from "./mdx-components/quote-block";
import { Steps } from "./mdx-components/steps";
import { ComparisonTable } from "./mdx-components/comparison-table";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

function HeadingAnchor({
  id,
  level,
  children,
}: {
  id: string;
  level: 2 | 3 | 4;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
      aria-label={`Link to this section`}
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

  if (level === 2) return <h2 id={id} className={headingClass}>{inner}</h2>;
  if (level === 3) return <h3 id={id} className={headingClass}>{inner}</h3>;
  return <h4 id={id} className={headingClass}>{inner}</h4>;
}

const components = {
  CodeBlock,
  Callout,
  ArchitectureDiagram,
  MetricsCard,
  ArticleImage,
  QuoteBlock,
  Steps,
  ComparisonTable,
  // Override default elements
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="not-prose">
      {children}
    </pre>
  ),
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Check if this is an inline code block
    const isInline = !className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 bg-[#002A6B]/50 border border-[#002A6B] rounded text-sm font-mono text-[#3B80EC]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  h2: ({
    children,
    id,
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingAnchor id={id || slugify(String(children))} level={2}>
      {children}
    </HeadingAnchor>
  ),
  h3: ({
    children,
    id,
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingAnchor id={id || slugify(String(children))} level={3}>
      {children}
    </HeadingAnchor>
  ),
  h4: ({
    children,
    id,
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingAnchor id={id || slugify(String(children))} level={4}>
      {children}
    </HeadingAnchor>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[#7A8BA7] leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside space-y-2 text-[#7A8BA7] mb-6 ml-4"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside space-y-2 text-[#7A8BA7] mb-6 ml-4"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-[#7A8BA7]" {...props}>
      {children}
    </li>
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-[#3B80EC] hover:text-[#F0F5FB] underline underline-offset-4 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-[#0054D6] pl-6 my-8 italic text-[#7A8BA7]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-[#002A6B]/50">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[#001535]/50 border-b border-[#002A6B]/50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left px-4 py-3 text-[#F0F5FB] font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-[#7A8BA7] border-t border-[#002A6B]/30"
      {...props}
    >
      {children}
    </td>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-12 border-[#002A6B]/50" {...props} />
  ),
};

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  // For now, render as basic markdown-styled content
  // In a full implementation, you'd use MDXRemote with serialization
  return (
    <div className="mdx-content">
      <MDXRenderer content={content} />
    </div>
  );
}

function MDXRenderer({ content }: { content: string }) {
  // Simple markdown-to-JSX conversion for basic content
  // This is a simplified version - for full MDX support, use proper serialization
  const rendered = useMemo(() => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentCodeBlock: string[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeFilename = "";
    let listBuffer: React.ReactNode[] = [];
    let listType: "ul" | "ol" | null = null;
    let listStartIndex = 0;

    const flushList = () => {
      if (listBuffer.length === 0 || listType === null) return;
      if (listType === "ol") {
        elements.push(
          <ol
            key={`ol-${listStartIndex}`}
            className="list-decimal list-inside space-y-2 text-[#7A8BA7] mb-6 ml-4"
          >
            {listBuffer}
          </ol>,
        );
      } else {
        elements.push(
          <ul
            key={`ul-${listStartIndex}`}
            className="list-disc list-inside space-y-2 text-[#7A8BA7] mb-6 ml-4"
          >
            {listBuffer}
          </ul>,
        );
      }
      listBuffer = [];
      listType = null;
    };

    lines.forEach((line, index) => {
      // Check for code block start/end
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          flushList();
          inCodeBlock = true;
          const match = line.match(/```(\w+)?(?:\s+(.+))?/);
          codeLanguage = match?.[1] || "text";
          codeFilename = match?.[2] || "";
        } else {
          elements.push(
            <CodeBlock
              key={`code-${index}`}
              language={codeLanguage}
              filename={codeFilename}
            >
              {currentCodeBlock.join("\n")}
            </CodeBlock>,
          );
          currentCodeBlock = [];
          inCodeBlock = false;
          codeLanguage = "";
          codeFilename = "";
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Skip empty lines (they'll be handled as spacing)
      if (line.trim() === "") {
        return;
      }

      const isBullet = line.startsWith("- ") || line.startsWith("* ");
      const isNumbered = /^\d+\.\s/.test(line);

      if (!isBullet && !isNumbered) {
        flushList();
      }

      // MDX Component: <Callout>
      if (line.includes("<Callout")) {
        const typeMatch = line.match(/type="(\w+)"/);
        const titleMatch = line.match(/title="([^"]+)"/);
        const contentMatch = content.match(
          new RegExp(`<Callout[^>]*>([\\s\\S]*?)</Callout>`),
        );
        if (contentMatch) {
          elements.push(
            <Callout
              key={`callout-${index}`}
              type={
                (typeMatch?.[1] as "info" | "warning" | "success" | "error") ||
                "info"
              }
              title={titleMatch?.[1]}
            >
              {contentMatch[1].trim()}
            </Callout>,
          );
        }
        return;
      }

      // Headings
      if (line.startsWith("## ")) {
        const text = line.slice(3);
        elements.push(
          <HeadingAnchor key={`h2-${index}`} id={slugify(text)} level={2}>
            {text}
          </HeadingAnchor>,
        );
        return;
      }

      if (line.startsWith("### ")) {
        const text = line.slice(4);
        elements.push(
          <HeadingAnchor key={`h3-${index}`} id={slugify(text)} level={3}>
            {text}
          </HeadingAnchor>,
        );
        return;
      }

      if (line.startsWith("#### ")) {
        const text = line.slice(5);
        elements.push(
          <HeadingAnchor key={`h4-${index}`} id={slugify(text)} level={4}>
            {text}
          </HeadingAnchor>,
        );
        return;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-[#0054D6] pl-6 my-8 italic text-[#7A8BA7]"
          >
            <p>{line.slice(2)}</p>
          </blockquote>,
        );
        return;
      }

      // Lists
      if (isBullet) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
          listStartIndex = index;
        }
        listBuffer.push(
          <li key={`li-${index}`} className="text-[#7A8BA7]">
            {parseInlineMarkdown(line.slice(2))}
          </li>,
        );
        return;
      }

      // Numbered lists
      if (isNumbered) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
          listStartIndex = index;
        }
        listBuffer.push(
          <li key={`li-${index}`} className="text-[#7A8BA7]">
            {parseInlineMarkdown(line.replace(/^\d+\.\s/, ""))}
          </li>,
        );
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={`p-${index}`} className="text-[#7A8BA7] leading-relaxed mb-6">
          {parseInlineMarkdown(line)}
        </p>,
      );
    });

    flushList();

    return elements;
  }, [content]);

  return <>{rendered}</>;
}

function parseInlineMarkdown(text: string): React.ReactNode {
  // Handle inline code
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    if (codeMatch && codeMatch.index !== undefined) {
      // Add text before code
      if (codeMatch.index > 0) {
        parts.push(
          parseBoldItalic(remaining.slice(0, codeMatch.index), keyIndex++),
        );
      }
      // Add inline code
      parts.push(
        <code
          key={`code-inline-${keyIndex++}`}
          className="px-1.5 py-0.5 bg-[#002A6B]/50 border border-[#002A6B] rounded text-sm font-mono text-[#3B80EC]"
        >
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
    } else {
      parts.push(parseBoldItalic(remaining, keyIndex++));
      remaining = "";
    }
  }

  return parts.length === 1 ? parts[0] : parts;
}

function parseBoldItalic(text: string, baseKey: number): React.ReactNode {
  // Handle **bold** and *italic*
  const boldMatch = text.match(/\*\*([^*]+)\*\*/);
  if (boldMatch && boldMatch.index !== undefined) {
    return (
      <>
        {boldMatch.index > 0 && text.slice(0, boldMatch.index)}
        <strong key={`bold-${baseKey}`} className="text-[#F0F5FB] font-medium">
          {boldMatch[1]}
        </strong>
        {text.slice(boldMatch.index + boldMatch[0].length)}
      </>
    );
  }

  const italicMatch = text.match(/\*([^*]+)\*/);
  if (italicMatch && italicMatch.index !== undefined) {
    return (
      <>
        {italicMatch.index > 0 && text.slice(0, italicMatch.index)}
        <em key={`italic-${baseKey}`}>{italicMatch[1]}</em>
        {text.slice(italicMatch.index + italicMatch[0].length)}
      </>
    );
  }

  // Handle links [text](url)
  const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (linkMatch && linkMatch.index !== undefined) {
    const isExternal = linkMatch[2].startsWith("http");
    return (
      <>
        {linkMatch.index > 0 && text.slice(0, linkMatch.index)}
        <a
          key={`link-${baseKey}`}
          href={linkMatch[2]}
          className="text-[#3B80EC] hover:text-[#F0F5FB] underline underline-offset-4 transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
        {text.slice(linkMatch.index + linkMatch[0].length)}
      </>
    );
  }

  return text;
}
