import CalculatorForm from "@/components/calculator/calculator-form"

export default function SavingsCalculator() {
  return (
    <section id="calculator" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Розрахуйте ROI вашої автоматизації
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Введіть параметри вашого бізнесу — отримайте точний розрахунок
          </p>
        </div>
        <CalculatorForm />
      </div>
    </section>
  )
}
