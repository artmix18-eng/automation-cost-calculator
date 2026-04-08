import { z } from "zod"

export const calcInputSchema = z.object({
  employees: z.number({ error: "Введіть число" }).int().min(1, "Мін. 1 співробітник"),
  hourlyRate: z.number({ error: "Введіть число" }).min(1, "Ставка > 0"),
  hoursPerWeek: z.number({ error: "Введіть число" }).min(1, "Мін. 1 год/тиждень"),
  automationPercent: z
    .number({ error: "Введіть число" })
    .min(1, "Мін. 1%")
    .max(100, "Макс. 100%"),
  implementationCost: z.number({ error: "Введіть число" }).min(1, "Вартість > 0"),
  monthlyToolCost: z.number({ error: "Введіть число" }).min(1, "Вартість > 0"),
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// UA mobile: +380XXXXXXXXX or 0XXXXXXXXX, international: +XXXXXXXXXXX
const phoneRegex = /^(\+?380\d{9}|0\d{9}|\+\d{7,15})$/

export const leadFormSchema = z.object({
  name: z.string().min(2, "Мін. 2 символи"),
  contact: z
    .string()
    .min(1, "Обов'язкове поле")
    .refine(
      (val) => emailRegex.test(val) || phoneRegex.test(val.replace(/[\s\-()]/g, "")),
      { message: "Введіть коректний email або телефон" }
    ),
  company: z.string().min(1, "Обов'язкове поле"),
})

export type CalcInputForm = z.infer<typeof calcInputSchema>
export type LeadForm = z.infer<typeof leadFormSchema>
