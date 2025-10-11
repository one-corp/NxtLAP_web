import React from "react";
import faqData from "@/Data/FAQs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

function Page() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 mb-10">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20 sm:mt-24">
        <div className="w-[95%] sm:w-[90%] max-w-5xl h-full border-2 border-dashed border-border rounded-lg" />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
          <Badge
            variant="outline"
            className="text-sm sm:text-base md:text-lg lg:text-xl px-3 py-1 translate-y-3 md:-translate-y-1"
          >
            Frequently Asked Questions
          </Badge>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
          We’ve done our best to clarify the details and give you everything you
          need to get started. If you still have questions, feel free to reach
          out to us at{" "}
          <a
            href="mailto:founders@nxtlap.com"
            className="text-primary/80 underline break-words"
          >
            founders@nxtlap.com
          </a>
          .
        </p>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["item-1"]}
        className="relative z-10 w-full max-w-2xl divide-y divide-border rounded-md border bg-card shadow-md"
      >
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={`item-${faq.id}`}
            className="px-2 sm:px-4"
          >
            <AccordionTrigger className="text-left font-medium py-3 sm:py-4 hover:no-underline text-sm sm:text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-3 sm:pb-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default Page;