interface Step {
  title: string
  description: string
}

interface StepsProps {
  steps: Step[]
}

export function Steps({ steps }: StepsProps) {
  return (
    <div className="my-8 space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0054D6]/10 border border-[#0054D6]/30 flex items-center justify-center">
            <span className="text-sm font-mono text-[#3B80EC]">{index + 1}</span>
          </div>
          <div className="flex-1 pt-1">
            <h4 className="text-base font-medium text-[#F0F5FB] mb-1">
              {step.title}
            </h4>
            <p className="text-sm text-[#7A8BA7] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
