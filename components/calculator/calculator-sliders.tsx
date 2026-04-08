"use client"

import { Controller, type Control } from "react-hook-form"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CalcInputForm } from "@/lib/schema"

interface CalculatorSlidersProps {
  control: Control<CalcInputForm>
}

interface SliderFieldProps {
  label: string
  hint: string
  value: number
  min: number
  max: number
  step: number
  displayValue: string
  onChange: (val: number) => void
}

function SliderField({ label, hint, value, min, max, step, displayValue, onChange }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm font-semibold text-primary">{displayValue}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(vals) => {
          const arr = Array.isArray(vals) ? vals : [vals]
          onChange(arr[0] as number)
        }}
      />
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  )
}

interface NumberInputFieldProps {
  label: string
  hint: string
  value: number
  suffix?: string
  onChange: (val: number) => void
  error?: string
}

function NumberInputField({ label, hint, value, suffix, onChange, error }: NumberInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pr-12"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  )
}

export default function CalculatorSliders({ control }: CalculatorSlidersProps) {
  return (
    <div className="space-y-6">
      <Controller
        control={control}
        name="employees"
        render={({ field, fieldState }) => (
          <SliderField
            label="Кількість співробітників"
            hint="Скільки людей виконують рутинні завдання"
            value={field.value}
            min={1}
            max={50}
            step={1}
            displayValue={`${field.value} осіб`}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="hoursPerWeek"
        render={({ field }) => (
          <SliderField
            label="Годин на рутину / тиждень"
            hint="Скільки годин на тиждень іде на задачі, які можна автоматизувати"
            value={field.value}
            min={1}
            max={40}
            step={1}
            displayValue={`${field.value} год`}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="automationPercent"
        render={({ field }) => (
          <SliderField
            label="Відсоток автоматизації"
            hint="Яку частину цих задач реально автоматизувати"
            value={field.value}
            min={10}
            max={95}
            step={5}
            displayValue={`${field.value}%`}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="hourlyRate"
        render={({ field, fieldState }) => (
          <NumberInputField
            label="Середня годинна ставка"
            hint="Середня вартість години роботи співробітника"
            value={field.value}
            suffix="₴/год"
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="implementationCost"
        render={({ field, fieldState }) => (
          <NumberInputField
            label="Вартість впровадження"
            hint="Одноразові витрати на налаштування автоматизації"
            value={field.value}
            suffix="₴"
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="monthlyToolCost"
        render={({ field, fieldState }) => (
          <NumberInputField
            label="Щомісячні витрати на інструменти"
            hint="Підписки, API, сервіси автоматизації"
            value={field.value}
            suffix="₴/міс"
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    </div>
  )
}
