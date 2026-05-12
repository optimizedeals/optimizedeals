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
    <div className="not-prose my-6 rounded-xl overflow-hidden border border-[#002A6B]/50 bg-[#001535]/50 relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#001535] border-b border-[#002A6B]/50">
        <span className="text-xs font-mono text-[#585F78]">
          {language || "text"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[#585F78] hover:text-[#F0F5FB] transition-colors"
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
        className={`overflow-x-auto p-4 text-sm font-mono text-[#F0F5FB] leading-relaxed ${className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}
