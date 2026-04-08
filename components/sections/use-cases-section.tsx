"use client"

import { useState } from "react"
import { BarChart2, TrendingUp, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCases } from "@/data/use-cases"
import FadeInSection from "@/components/ui/fade-in-section"

const iconMap: Record<string, React.ElementType> = {
  BarChart2,
  TrendingUp,
  MessageCircle,
}

export default function UseCasesSection() {
  const [activeId, setActiveId] = useState(useCases[0].id)
  const active = useCases.find((c) => c.id === activeId)!

  return (
    <FadeInSection>
    <section id="cases" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Реальні результати</h2>
          <p className="mt-3 text-lg text-muted-foreground">Кейси наших клієнтів</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {useCases.map((c) => {
            const Icon = iconMap[c.icon] ?? BarChart2
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all",
                  c.id === activeId
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {c.category}
              </button>
            )
          })}
        </div>

        {/* Active case card */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {active.category}
          </div>
          <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">{active.title}</h3>

          <div className="mb-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Проблема
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">{active.challenge}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Рішення
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">{active.solution}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {active.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-background p-4 text-center"
              >
                <p className="text-lg font-extrabold text-primary sm:text-xl">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
