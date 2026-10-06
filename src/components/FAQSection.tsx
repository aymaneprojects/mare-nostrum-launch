import { useFadeIn } from "@/hooks/useFadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
}

const FAQSection = ({ title = "Questions fréquentes", faqs }: FAQSectionProps) => {
  const fade = useFadeIn(0);
  // Note: Le schéma FAQ est maintenant géré uniquement par SEOHead
  // pour éviter les doublons détectés par Google Search Console

  return (
    <section ref={fade as React.RefObject<HTMLElement>} className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-10 md:mb-16 text-foreground">
          {title}
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-5 md:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground max-w-prose leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
