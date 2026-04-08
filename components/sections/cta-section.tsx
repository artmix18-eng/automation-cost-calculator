"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { leadFormSchema, type LeadForm } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CtaSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadForm>({
    resolver: zodResolver(leadFormSchema),
  })

  async function onSubmit(data: LeadForm) {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Server error")

      toast.success("Заявку отримано! Зв'яжемось протягом 24 годин.")
      setSubmitted(true)
      reset()
    } catch {
      toast.error("Щось пішло не так. Спробуйте ще раз.")
    }
  }

  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                  ✅
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Дякуємо!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Ми зв&apos;яжемося з вами протягом 24 годин.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Надіслати ще раз
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Готові дізнатись скільки коштує ваша рутина?
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Отримайте безкоштовний аудит автоматизації вашого бізнесу
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Ваше ім&apos;я</Label>
                    <Input
                      id="name"
                      placeholder="Іван Петренко"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact">Email або телефон</Label>
                    <Input
                      id="contact"
                      placeholder="ivan@company.ua або +380991234567"
                      {...register("contact")}
                    />
                    {errors.contact && (
                      <p className="text-xs text-destructive">{errors.contact.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company">Компанія</Label>
                    <Input
                      id="company"
                      placeholder="Назва вашої компанії"
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="text-xs text-destructive">{errors.company.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Надсилаємо..." : "Отримати аудит безкоштовно →"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
