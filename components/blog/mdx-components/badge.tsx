import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?:
    | "default"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral"
    | "accent";
  children: React.ReactNode;
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-primary/10 text-accent border-primary/30",
  info: "bg-primary/10 text-accent border-primary/30",
  success: "bg-green-500/10 text-green-400 border-green-500/30",
  warning: "bg-brand-gold/10 text-brand-gold border-brand-gold/30",
  error: "bg-red-500/10 text-red-400 border-red-500/30",
  neutral: "bg-border/30 text-muted-foreground border-border/50",
  accent: "bg-accent/10 text-accent border-accent/30",
};

export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono align-middle",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}
