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
  default: "bg-[#0054D6]/10 text-[#3B80EC] border-[#0054D6]/30",
  info: "bg-[#0054D6]/10 text-[#3B80EC] border-[#0054D6]/30",
  success: "bg-green-500/10 text-green-400 border-green-500/30",
  warning: "bg-[#A17D33]/10 text-[#A17D33] border-[#A17D33]/30",
  error: "bg-red-500/10 text-red-400 border-red-500/30",
  neutral: "bg-[#002A6B]/30 text-[#7A8BA7] border-[#002A6B]/50",
  accent: "bg-[#3B80EC]/10 text-[#3B80EC] border-[#3B80EC]/30",
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
