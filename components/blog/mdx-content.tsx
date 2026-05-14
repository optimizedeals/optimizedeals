import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import {
  CodeBlock,
  CodePre,
  Callout,
  ArchitectureDiagram,
  MetricsCard,
  ArticleImage,
  ImageGallery,
  QuoteBlock,
  Steps,
  ComparisonTable,
  Video,
  YouTube,
  AudioPlayer,
  Tabs,
  Accordion,
  FileTree,
  Kbd,
  Badge,
  Embed,
  FeatureGrid,
} from "./mdx-components";
import { CookieTable } from "../legal/cookie-table";
import { HeadingAnchor } from "./heading-anchor";
import { cn } from "@/lib/utils";
import { MDXProvider } from "@mdx-js/react";

interface MDXContentProps {
  content: string;
}

const mdxComponents = {
  CodeBlock,
  Callout,
  ArchitectureDiagram,
  MetricsCard,
  ArticleImage,
  ImageGallery,
  QuoteBlock,
  Steps,
  ComparisonTable,
  Video,
  YouTube,
  AudioPlayer,
  Tabs,
  Accordion,
  FileTree,
  Kbd,
  Badge,
  Embed,
  FeatureGrid,

  // Legal components
  CookieTable,

  Image: (
    props: React.ComponentProps<typeof Image> & { className?: string },
  ) => {
    const { src, alt, width, height, className, ...rest } = props;
    const w = typeof width === "string" ? parseInt(width, 10) : width || 800;
    const h = typeof height === "string" ? parseInt(height, 10) : height || 450;
    const isGif = typeof src === "string" && src.endsWith(".gif");
    return (
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={cn("w-full h-auto rounded-xl mx-auto my-2", className)}
        unoptimized={isGif}
        quality={100}
        {...rest}
      />
    );
  },

  h1: ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      id={id}
      className="text-3xl md:text-4xl font-medium text-foreground mt-12 mb-6 scroll-mt-24"
    >
      {children}
    </h1>
  ),
  h2: ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingAnchor id={id ?? ""} level={2}>
      {children}
    </HeadingAnchor>
  ),
  h3: ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingAnchor id={id ?? ""} level={3}>
      {children}
    </HeadingAnchor>
  ),
  h4: ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingAnchor id={id ?? ""} level={4}>
      {children}
    </HeadingAnchor>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside space-y-2 text-muted-foreground mb-6 ml-6"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside space-y-2 text-muted-foreground mb-6 ml-6"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground pl-1" {...props}>
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
      className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-foreground font-medium" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary pl-6 my-8 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-border/50 not-prose">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-card/50 border-b border-border/50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left px-4 py-3 text-foreground font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-muted-foreground border-t border-border/30"
      {...props}
    >
      {children}
    </td>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-12 border-border/50" {...props} />
  ),
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const isFenced =
      !!(props as Record<string, unknown>)["data-language"] ||
      !!className?.includes("language-");
    if (isFenced) {
      return (
        <code
          className={cn(
            "inline-flex items-center p-0.5 rounded-xs border border-border/70 text-sm font-mono align-middle",
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="px-1.5 py-0.5 bg-border/50 border border-border rounded text-sm font-mono text-accent"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    return <CodePre {...props} />;
  },
  figure: (props: React.HTMLAttributes<HTMLElement>) => {
    const isCodeFigure = "data-rehype-pretty-code-figure" in (props as object);
    if (isCodeFigure) {
      return <div className="not-prose">{props.children}</div>;
    }
    return <figure {...props} />;
  },
  figcaption: (props: React.HTMLAttributes<HTMLElement>) => {
    const isCodeTitle = "data-rehype-pretty-code-title" in (props as object);
    if (isCodeTitle) {
      // CodePre header already shows language. Skip the title strip to avoid duplication.
      return null;
    }
    return <figcaption {...props} />;
  },
  span: (props: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} />;
  },
} satisfies React.ComponentProps<typeof MDXProvider>["components"];

export async function MDXContent({ content }: MDXContentProps) {
  const { content: rendered } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
  });

  return <div className="mdx-content">{rendered}</div>;
}
