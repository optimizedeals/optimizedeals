"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodePreProps extends React.HTMLAttributes<HTMLPreElement> {
  "data-language"?: string;
  "data-theme"?: string;
}

export function CodePre({ children, className, ...props }: CodePreProps) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];

  const handleCopy = async () => {
    if (!ref.current) return;
    try {
      await navigator.clipboard.writeText(ref.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="not-prose my-6 rounded-xl overflow-hidden border border-border/50 bg-card/50 relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border/50">
        <span className="text-xs font-mono text-brand-gray">
          {language || "text"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-brand-gray hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        ref={ref}
        {...props}
        className={`overflow-x-auto p-4 text-sm font-mono text-foreground leading-relaxed ${className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}
