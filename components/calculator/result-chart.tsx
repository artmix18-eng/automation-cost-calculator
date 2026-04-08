"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { CalcResult } from "@/lib/calculator"
import { formatUAH } from "@/lib/format"

interface ResultChartProps {
  monthlyData: CalcResult["monthlyData"] | null | undefined
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string | number
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card px-3 py-2 text-sm shadow-lg">
      <p className="font-medium text-muted-foreground mb-1">Місяць {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {formatUAH(entry.value)}
        </p>
      ))}
    </div>
  )
}

function yAxisFormatter(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `₴${(value / 1_000_000).toFixed(1)}М`
  if (Math.abs(value) >= 1_000) return `₴${(value / 1_000).toFixed(0)}к`
  return `₴${value}`
}

export default function ResultChart({ monthlyData }: ResultChartProps) {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border bg-muted/20 text-muted-foreground text-sm">
        Введіть параметри, щоб побачити графік окупності
      </div>
    )
  }

  return (
    <div className="w-full">
      <p className="text-xs text-muted-foreground mb-3">Накопичений ефект за 12 місяців</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={monthlyData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientCumulative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradientSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />

          <XAxis
            dataKey="month"
            tickFormatter={(v) => `${v} міс`}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={yAxisFormatter}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={70}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>{value}</span>
            )}
          />

          <ReferenceLine
            y={0}
            stroke="#ef4444"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{ value: "Беззбитковість", fill: "#ef4444", fontSize: 11, position: "insideTopRight" }}
          />

          <Area
            type="monotone"
            dataKey="cumulative"
            name="Накопичена економія"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#gradientCumulative)"
            dot={false}
            activeDot={{ r: 5, fill: "#6366f1" }}
          />
          <Area
            type="monotone"
            dataKey="savings"
            name="Економія за місяць"
            stroke="#10b981"
            strokeWidth={1.5}
            fill="url(#gradientSavings)"
            dot={false}
            activeDot={{ r: 4, fill: "#10b981" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
