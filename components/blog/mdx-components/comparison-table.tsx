import { Check, X, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComparisonRow {
  feature: string
  values: (boolean | string | null)[]
}

interface ComparisonTableProps {
  title?: string
  headers: string[]
  rows: ComparisonRow[]
}

export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  const renderValue = (value: boolean | string | null) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-500 mx-auto" />
    }
    if (value === false) {
      return <X className="w-5 h-5 text-red-500 mx-auto" />
    }
    if (value === null) {
      return <Minus className="w-5 h-5 text-brand-gray mx-auto" />
    }
    return <span className="text-sm text-muted-foreground">{value}</span>
  }

  return (
    <div className="my-8 overflow-x-auto">
      {title && (
        <h4 className="text-sm font-medium text-foreground mb-4">{title}</h4>
      )}
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-border/50">
        <thead>
          <tr className="bg-card/50">
            <th className="text-left px-4 py-3 text-sm font-medium text-foreground border-b border-border/50">
              Feature
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-center px-4 py-3 text-sm font-medium text-foreground border-b border-border/50"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "border-b border-border/30 last:border-b-0",
                rowIndex % 2 === 0 ? "bg-transparent" : "bg-card/20"
              )}
            >
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {row.feature}
              </td>
              {row.values.map((value, valueIndex) => (
                <td key={valueIndex} className="px-4 py-3 text-center">
                  {renderValue(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
