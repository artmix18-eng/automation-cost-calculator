import type { CalcInput } from "../lib/calculator"

export type Preset = {
  id: string
  label: string
  description: string
  values: CalcInput
}

export const presets: Preset[] = [
  {
    id: "marketing",
    label: "Маркетинг",
    description: "Звіти, розсилки, контент-планування",
    values: {
      employees: 5,
      hourlyRate: 350,
      hoursPerWeek: 10,
      automationPercent: 65,
      implementationCost: 25000,
      monthlyToolCost: 1500,
    },
  },
  {
    id: "sales",
    label: "Відділ продажів",
    description: "CRM, follow-up, звіти по угодам",
    values: {
      employees: 8,
      hourlyRate: 400,
      hoursPerWeek: 12,
      automationPercent: 55,
      implementationCost: 35000,
      monthlyToolCost: 2000,
    },
  },
  {
    id: "support",
    label: "Підтримка",
    description: "Тікети, відповіді, ескалації",
    values: {
      employees: 6,
      hourlyRate: 300,
      hoursPerWeek: 15,
      automationPercent: 70,
      implementationCost: 20000,
      monthlyToolCost: 1200,
    },
  },
]
