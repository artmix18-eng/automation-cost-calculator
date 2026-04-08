"use client"

import CountUp from "react-countup"
import { TrendingUp, Clock, CalendarCheck, BarChart3, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatUAH, formatHours, formatMonths, formatROI } from "@/lib/format"
import type { CalcResult } from "@/lib/calculator"
import { cn } from "@/lib/utils"

interface ResultCardsProps {
  result: CalcResult | null
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  accent?: boolean
  wide?: boolean
  positive?: boolean | null
}

function MetricCard({ title, value, icon, accent, wide, positive }: MetricCardProps) {
  const valueColor =
    positive === true
      ? "text-emerald-500"
      : positive === false
        ? "text-red-500"
        : accent
          ? "text-primary"
          : "text-foreground"

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        wide && "col-span-2 sm:col-span-2",
        accent && "ring-primary/30 bg-primary/5"
      )}
    >
      <CardHeader className="pb-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <CardTitle className="text-xs font-medium uppercase tracking-wide">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className={cn("text-2xl font-bold tabular-nums", valueColor, wide && "text-3xl")}>
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

export default function ResultCards({ result }: ResultCardsProps) {
  if (!result) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className={cn("animate-pulse", i === 1 && "col-span-2")}>
            <CardHeader className="pb-1">
              <div className="h-3 w-24 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const { monthlyNetSavings, annualSavings, monthlyHoursSaved, paybackMonths, annualROI } = result

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Місячна економія */}
      <MetricCard
        key={`monthly-${monthlyNetSavings}`}
        title="Місячна економія"
        value={formatUAH(monthlyNetSavings)}
        icon={<Wallet className="size-4" />}
        accent
        positive={monthlyNetSavings >= 0 ? true : false}
      />

      {/* Річна економія — широка */}
      <MetricCard
        key={`annual-${annualSavings}`}
        title="Річна економія"
        value={formatUAH(annualSavings)}
        icon={<TrendingUp className="size-4" />}
        wide
        positive={annualSavings >= 0 ? true : false}
      />

      {/* Годин зекономлено */}
      <MetricCard
        key={`hours-${monthlyHoursSaved}`}
        title="Годин зекономлено"
        value={formatHours(monthlyHoursSaved)}
        icon={<Clock className="size-4" />}
      />

      {/* Окупність */}
      <MetricCard
        key={`payback-${paybackMonths}`}
        title="Окупність"
        value={formatMonths(paybackMonths)}
        icon={<CalendarCheck className="size-4" />}
      />

      {/* ROI за 12 міс */}
      <MetricCard
        key={`roi-${annualROI}`}
        title="ROI за 12 міс"
        value={formatROI(annualROI)}
        icon={<BarChart3 className="size-4" />}
        positive={annualROI >= 0 ? true : false}
      />
    </div>
  )
}
