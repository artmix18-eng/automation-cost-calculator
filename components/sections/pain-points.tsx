import { Clock, AlertTriangle, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import FadeInSection from "@/components/ui/fade-in-section"

const pains = [
  {
    icon: Clock,
    title: "Час витрачається на рутину",
    description:
      "Ваша команда витрачає годинники на завдання, які можна автоматизувати",
  },
  {
    icon: AlertTriangle,
    title: "Людський фактор = помилки",
    description:
      "Ручна робота призводить до помилок, дублювання та втрат",
  },
  {
    icon: TrendingDown,
    title: "Масштабування коштує дорого",
    description:
      "Щоб зробити більше — доводиться наймати більше людей",
  },
]

export default function PainPoints() {
  return (
    <FadeInSection>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Знайомо?</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            80% малого і середнього бізнесу стикається з цими проблемами щодня
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pains.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border-border/60 bg-card transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                  <Icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
