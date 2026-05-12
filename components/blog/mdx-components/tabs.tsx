"use client";

import {
  Tabs as RadixTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TabItem {
  label: string;
  value?: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
}

export function Tabs({ items, defaultValue }: TabsProps) {
  if (!items?.length) return null;
  const normalised = items.map((item, i) => ({
    ...item,
    value: item.value ?? `tab-${i}`,
  }));
  const initial = defaultValue ?? normalised[0].value;

  return (
    <div className="not-prose my-8">
      <RadixTabs defaultValue={initial} className="w-full">
        <TabsList className="bg-card/50 border border-border/50 p-1 h-auto flex flex-wrap gap-1">
          {normalised.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value!}
              className="text-muted-foreground data-[state=active]:bg-primary/20 data-[state=active]:text-accent data-[state=active]:border-primary/30 data-[state=active]:shadow-none rounded-md text-sm font-mono"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {normalised.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value!}
            className="mt-4 p-6 rounded-xl border border-border/50 bg-card/30"
          >
            {item.content}
          </TabsContent>
        ))}
      </RadixTabs>
    </div>
  );
}
