import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqItems } from "@/data/faq"
import FadeInSection from "@/components/ui/fade-in-section"

export default function FaqSection() {
  return (
    <FadeInSection>
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Часті запитання</h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <Accordion>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="py-4 text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
