"use client";

import {
  Accordion as RadixAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionEntry {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  type?: "single" | "multiple";
  defaultOpen?: number[];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function Accordion({
  items,
  type = "single",
  defaultOpen = [],
}: AccordionProps) {
  if (!items?.length) return null;

  const enriched = items.map((item, i) => ({
    ...item,
    value: `item-${i}`,
    slug: slugify(item.title) || `faq-${i}`,
  }));

  const rootProps =
    type === "single"
      ? {
          type: "single" as const,
          collapsible: true,
          defaultValue:
            defaultOpen[0] !== undefined
              ? `item-${defaultOpen[0]}`
              : undefined,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultOpen.map((i) => `item-${i}`),
        };

  return (
    <div className="not-prose my-8">
      <RadixAccordion
        {...rootProps}
        className="rounded-xl border border-[#002A6B]/50 bg-[#001535]/30 divide-y divide-[#002A6B]/30"
      >
        {enriched.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            id={item.slug}
            data-toc-anchor=""
            data-toc-text={item.title}
            className="border-b-0 px-4 scroll-mt-24"
          >
            <AccordionTrigger className="text-[#F0F5FB] hover:text-[#3B80EC] font-medium text-base">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#7A8BA7] leading-relaxed">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </RadixAccordion>
    </div>
  );
}
