import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Metric {
  label: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
}

interface MetricsCardProps {
  title?: string
  metrics: Metric[]
  columns?: 2 | 3 | 4
}

export function MetricsCard({ title, metrics, columns = 3 }: MetricsCardProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }

  return (
    <div className="my-8 p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl">
      {title && (
        <h4 className="text-sm font-medium text-[#F0F5FB] mb-6">{title}</h4>
      )}
      <div className={cn("grid gap-6", gridCols[columns])}>
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl md:text-3xl font-medium text-[#F0F5FB] mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-[#7A8BA7] mb-2">{metric.label}</div>
            {metric.change && (
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono",
                  metric.trend === "up" && "bg-green-500/10 text-green-400",
                  metric.trend === "down" && "bg-red-500/10 text-red-400",
                  metric.trend === "neutral" && "bg-[#002A6B]/50 text-[#7A8BA7]"
                )}
              >
                {metric.trend === "up" && <TrendingUp className="w-3 h-3" />}
                {metric.trend === "down" && <TrendingDown className="w-3 h-3" />}
                {metric.trend === "neutral" && <Minus className="w-3 h-3" />}
                {metric.change}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
