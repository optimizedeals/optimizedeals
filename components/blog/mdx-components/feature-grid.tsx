import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon?: keyof typeof Icons;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
}

export function FeatureGrid({ features, columns = 2 }: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
  };

  return (
    <div className={cn("not-prose my-8 grid grid-cols-1 gap-4", gridCols[columns])}>
      {features.map((feature, i) => {
        const IconComp = feature.icon
          ? (Icons[feature.icon] as React.ComponentType<{ className?: string }>)
          : null;
        return (
          <div
            key={i}
            className="p-5 rounded-xl border border-[#002A6B]/50 bg-[#001535]/30 hover:border-[#002A6B] transition-colors"
          >
            {IconComp && (
              <div className="w-10 h-10 rounded-lg bg-[#0054D6]/10 border border-[#0054D6]/30 flex items-center justify-center mb-4">
                <IconComp className="w-5 h-5 text-[#3B80EC]" />
              </div>
            )}
            <h4 className="text-base font-medium text-[#F0F5FB] mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-[#7A8BA7] leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
