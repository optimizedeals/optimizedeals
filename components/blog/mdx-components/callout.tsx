import { AlertCircle, CheckCircle, Info, AlertTriangle, Lightbulb, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error" | "tip" | "performance"
  title?: string
  children: React.ReactNode
}

const calloutConfig = {
  info: {
    icon: Info,
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
    titleColor: "text-accent",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-brand-gold/10",
    borderColor: "border-brand-gold/30",
    iconColor: "text-brand-gold",
    titleColor: "text-brand-gold",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500",
    titleColor: "text-green-400",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    iconColor: "text-red-500",
    titleColor: "text-red-400",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    iconColor: "text-accent",
    titleColor: "text-accent",
  },
  performance: {
    icon: Zap,
    bgColor: "bg-brand-gold/10",
    borderColor: "border-brand-gold/30",
    iconColor: "text-brand-gold",
    titleColor: "text-brand-gold",
  },
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "my-6 p-4 rounded-xl border",
        config.bgColor,
        config.borderColor
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn("font-medium mb-1", config.titleColor)}>
              {title}
            </h4>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed [&>*]:m-0 [&>*+*]:mt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
