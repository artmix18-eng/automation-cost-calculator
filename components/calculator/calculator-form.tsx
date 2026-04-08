"use client"

import { useState, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { calcInputSchema, type CalcInputForm } from "@/lib/schema"
import { calculateROI, type CalcResult } from "@/lib/calculator"
import { presets } from "@/data/presets"
import CalculatorSliders from "./calculator-sliders"
import ResultCards from "./result-cards"
import ResultChart from "./result-chart"

export default function CalculatorForm() {
  const [activePreset, setActivePreset] = useState<string>("marketing")
  const [result, setResult] = useState<CalcResult | null>(null)

  const form = useForm<CalcInputForm>({
    resolver: zodResolver(calcInputSchema),
    defaultValues: presets[0].values,
  })

  const { control, reset } = form
  const watchedValues = useWatch({ control })

  useEffect(() => {
    const {
      employees,
      hourlyRate,
      hoursPerWeek,
      automationPercent,
      implementationCost,
      monthlyToolCost,
    } = watchedValues

    if (
      employees != null &&
      hourlyRate != null &&
      hoursPerWeek != null &&
      automationPercent != null &&
      implementationCost != null &&
      monthlyToolCost != null
    ) {
      try {
        const calc = calculateROI({
          employees,
          hourlyRate,
          hoursPerWeek,
          automationPercent,
          implementationCost,
          monthlyToolCost,
        })
        setResult(calc)
      } catch {
        // invalid values, skip
      }
    }
  }, [watchedValues])

  function handlePreset(presetId: string) {
    const preset = presets.find((p) => p.id === presetId)
    if (!preset) return
    setActivePreset(presetId)
    reset(preset.values)
  }

  return (
    <div className="space-y-6">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePreset(preset.id)}
            className={cn(
              "relative rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200",
              "hover:border-primary/60 hover:bg-primary/5",
              activePreset === preset.id
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            {preset.label}
            {activePreset === preset.id && (
              <motion.span
                layoutId="preset-indicator"
                className="absolute inset-0 rounded-lg ring-2 ring-primary/40 pointer-events-none"
              />
            )}
          </button>
        ))}
        <p className="w-full text-xs text-muted-foreground">
          {presets.find((p) => p.id === activePreset)?.description}
        </p>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: sliders */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Параметри бізнесу
          </h3>
          <CalculatorSliders control={control} />
        </div>

        {/* Right: results */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Результати
            </h3>
            <ResultCards result={result} />
          </div>

          <div className="rounded-xl border bg-card p-6">
            <ResultChart monthlyData={result?.monthlyData} />
          </div>
        </div>
      </div>
    </div>
  )
}
