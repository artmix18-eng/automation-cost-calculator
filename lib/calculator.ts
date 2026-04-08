export type CalcInput = {
  employees: number
  hourlyRate: number
  hoursPerWeek: number
  automationPercent: number
  implementationCost: number
  monthlyToolCost: number
}

export type CalcResult = {
  monthlyHoursSaved: number
  monthlyCostSaved: number
  monthlyNetSavings: number
  annualSavings: number
  paybackMonths: number
  annualROI: number
  monthlyData: { month: number; savings: number; cumulative: number }[]
}

export function calculateROI(input: CalcInput): CalcResult {
  const {
    employees,
    hourlyRate,
    hoursPerWeek,
    automationPercent,
    implementationCost,
    monthlyToolCost,
  } = input

  const monthlyHoursSaved = round2(
    employees * hoursPerWeek * (automationPercent / 100) * 4.33
  )

  const monthlyCostSaved = round2(monthlyHoursSaved * hourlyRate)

  const monthlyNetSavings = round2(monthlyCostSaved - monthlyToolCost)

  const paybackMonths =
    monthlyNetSavings <= 0
      ? Infinity
      : round2(implementationCost / monthlyNetSavings)

  const annualSavings = round2(monthlyNetSavings * 12)

  const annualROI =
    implementationCost <= 0
      ? 0
      : round2(
          ((monthlyNetSavings * 12 - implementationCost) / implementationCost) *
            100
        )

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    const savings = round2(monthlyNetSavings)
    const cumulative = round2(monthlyNetSavings * month - implementationCost)
    return { month, savings, cumulative }
  })

  return {
    monthlyHoursSaved,
    monthlyCostSaved,
    monthlyNetSavings,
    annualSavings,
    paybackMonths,
    annualROI,
    monthlyData,
  }
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}
