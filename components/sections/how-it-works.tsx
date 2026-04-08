import { Search, Zap, TrendingUp } from "lucide-react"
import FadeInSection from "@/components/ui/fade-in-section"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Аналіз",
    description:
      "Розповідаєте про ваші процеси та больові точки. Знаходимо де ховається час.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Автоматизація",
    description:
      "Будуємо workflow на n8n, Make або Zapier. Без коду, без болю.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Результат",
    description:
      "Команда фокусується на важливому. Рутина — на autopilot.",
  },
]

export default function HowItWorks() {
  return (
    <FadeInSection>
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Як це працює</h2>
        </div>

        <div className="relative mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {/* Connector lines (desktop) */}
          <div
            aria-hidden
            className="absolute top-10 left-1/3 hidden h-0.5 w-1/3 -translate-y-1/2 bg-border sm:block"
          />
          <div
            aria-hidden
            className="absolute top-10 left-2/3 hidden h-0.5 w-1/3 -translate-y-1/2 bg-border sm:block"
          />

          {steps.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="relative flex flex-col items-center text-center">
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                <Icon className="h-8 w-8 text-primary" />
                <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {number.replace("0", "")}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
