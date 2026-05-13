import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { CookieTable } from "@/components/legal/cookie-table";

type MDXComponents = Record<string, React.ComponentType<{ children?: ReactNode } & Record<string, unknown>>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-xl font-medium text-foreground mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-base text-muted-foreground leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-muted-foreground marker:text-accent">
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-muted-foreground marker:text-accent">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li className="leading-relaxed [&>p]:mb-2">{children}</li>
    ),
    strong: ({ children }: { children?: ReactNode }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-accent/40 bg-card/30 pl-6 pr-4 py-3 my-6 rounded-r-md text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-border/60" />,
    table: ({ children }: { children?: ReactNode }) => (
      <div className="my-8 -mx-6 sm:mx-0 overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 border border-border/60 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: ReactNode }) => (
      <thead className="bg-card/60">{children}</thead>
    ),
    tbody: ({ children }: { children?: ReactNode }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }: { children?: ReactNode }) => (
      <tr className="even:bg-card/20">{children}</tr>
    ),
    th: ({ children }: { children?: ReactNode }) => (
      <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border/60 align-top">
        {children}
      </th>
    ),
    td: ({ children }: { children?: ReactNode }) => (
      <td className="text-muted-foreground px-4 py-3 border-b border-border/40 align-top leading-relaxed [&_code]:text-xs [&_code]:bg-border/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-foreground [&_code]:font-mono">
        {children}
      </td>
    ),
    code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
      <code
        className="text-sm bg-border/40 px-1.5 py-0.5 rounded text-foreground font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
      const url = href ?? "#";
      const external = /^https?:\/\//.test(url);
      if (external || url.startsWith("mailto:") || url.startsWith("tel:")) {
        return (
          <a
            href={url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-accent hover:text-foreground underline underline-offset-2 transition-colors"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={url}
          className="text-accent hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {children}
        </Link>
      );
    },
    CookieTable: CookieTable as React.ComponentType<{ children?: ReactNode } & Record<string, unknown>>,
    ...components,
  } as MDXComponents;
}
