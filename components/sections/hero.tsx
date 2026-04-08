"use client"

import { motion, type Variants, type Easing } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ease: Easing = "easeOut"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease },
  }),
}

const stats = [
  { value: "120+", label: "автоматизацій" },
  { value: "₴2.4М", label: "зекономлено клієнтам" },
  { value: "340%", label: "середній ROI" },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-24"
    >
      {/* Background blur decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]"
      />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <Badge className="mb-6 inline-flex gap-1.5 px-4 py-1.5 text-sm font-medium">
            🚀 Автоматизація бізнес-процесів
          </Badge>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Скільки грошей з&apos;їдає
          </span>{" "}
          ваша рутина?
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Розрахуйте точний ROI автоматизації за 2 хвилини. Без консультанта, без чекання.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#calculator"
            className={cn(buttonVariants({ size: "lg" }), "px-8 text-base font-semibold")}
          >
            Розрахувати ROI →
          </a>
          <a
            href="#cases"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8 text-base font-semibold")}
          >
            Переглянути кейси
          </a>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-foreground sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
