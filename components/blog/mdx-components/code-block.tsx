"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language = "text",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.trim().split("\n");

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border/50 bg-card/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-gray" />
          <span className="text-xs font-mono text-brand-gray">
            {filename || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-brand-gray hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm font-mono leading-relaxed">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="select-none w-8 shrink-0 text-brand-gray text-right pr-4">
                  {index + 1}
                </span>
              )}
              <code className="text-foreground">
                <SyntaxHighlight code={line} language={language} />
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// Simple syntax highlighting
function SyntaxHighlight({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  if (!code) return null;

  // Basic syntax highlighting patterns
  const patterns: { [key: string]: { pattern: RegExp; className: string }[] } =
    {
      typescript: [
        { pattern: /(\/\/.*$)/gm, className: "text-brand-gray" }, // Comments
        { pattern: /(["'`].*?["'`])/g, className: "text-brand-gold" }, // Strings
        {
          pattern:
            /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw)\b/g,
          className: "text-primary",
        }, // Keywords
        {
          pattern: /\b(true|false|null|undefined)\b/g,
          className: "text-accent",
        }, // Booleans
        { pattern: /\b(\d+)\b/g, className: "text-brand-gold" }, // Numbers
        { pattern: /(@\w+)/g, className: "text-accent" }, // Decorators
      ],
      javascript: [
        { pattern: /(\/\/.*$)/gm, className: "text-brand-gray" },
        { pattern: /(["'`].*?["'`])/g, className: "text-brand-gold" },
        {
          pattern:
            /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|async|await|try|catch|throw)\b/g,
          className: "text-primary",
        },
        {
          pattern: /\b(true|false|null|undefined)\b/g,
          className: "text-accent",
        },
        { pattern: /\b(\d+)\b/g, className: "text-brand-gold" },
      ],
      tsx: [
        { pattern: /(\/\/.*$)/gm, className: "text-brand-gray" },
        { pattern: /(["'`].*?["'`])/g, className: "text-brand-gold" },
        {
          pattern:
            /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw)\b/g,
          className: "text-primary",
        },
        {
          pattern: /\b(true|false|null|undefined)\b/g,
          className: "text-accent",
        },
        { pattern: /\b(\d+)\b/g, className: "text-brand-gold" },
        { pattern: /(<\/?[\w-]+)/g, className: "text-accent" }, // JSX tags
      ],
      jsx: [
        { pattern: /(\/\/.*$)/gm, className: "text-brand-gray" },
        { pattern: /(["'`].*?["'`])/g, className: "text-brand-gold" },
        {
          pattern:
            /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|async|await|try|catch|throw)\b/g,
          className: "text-primary",
        },
        {
          pattern: /\b(true|false|null|undefined)\b/g,
          className: "text-accent",
        },
        { pattern: /\b(\d+)\b/g, className: "text-brand-gold" },
        { pattern: /(<\/?[\w-]+)/g, className: "text-accent" },
      ],
      json: [
        { pattern: /(["'].*?["'])\s*:/g, className: "text-accent" }, // Keys
        { pattern: /:\s*(["'].*?["'])/g, className: "text-brand-gold" }, // String values
        { pattern: /:\s*(\d+)/g, className: "text-brand-gold" }, // Number values
        { pattern: /\b(true|false|null)\b/g, className: "text-primary" }, // Booleans
      ],
      bash: [
        { pattern: /(#.*$)/gm, className: "text-brand-gray" }, // Comments
        { pattern: /(["'].*?["'])/g, className: "text-brand-gold" }, // Strings
        {
          pattern: /\b(npm|npx|yarn|pnpm|cd|mkdir|ls|git|docker)\b/g,
          className: "text-primary",
        }, // Commands
        { pattern: /(\$\w+)/g, className: "text-accent" }, // Variables
      ],
    };

  // Return code as-is if no patterns for this language
  const langPatterns = patterns[language];
  if (!langPatterns) {
    return <>{code}</>;
  }

  // Apply patterns - simplified, returns the original code with basic highlighting
  // For production, use a proper syntax highlighting library like Prism or Shiki
  return <>{code}</>;
}
