"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I add a new book?",
    answer:
      "After logging in, go to the Add Book page, fill out the required information, and submit the form.",
  },
  {
    question: "Can I edit my uploaded books?",
    answer:
      "Yes. Visit the My Books page where you can update or delete any book you have added.",
  },
  {
    question: "Is BookAbode free to use?",
    answer:
      "Yes. You can browse books and manage your own collection without any subscription.",
  },
  {
    question: "Can I search books by category?",
    answer:
      "Absolutely. The Explore Books page supports searching, filtering by category, sorting, and pagination.",
  },
];

export default function FAQ() {
 return (
  <section className="bg-[#261311] py-20">
    <div className="mx-auto max-w-4xl px-6">

      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-gray-300">
          Find answers to the most common questions about BookAbode.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="space-y-5"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="overflow-hidden rounded-2xl border border-[#C3955B]/30 bg-[#C3955B] px-6 shadow-lg transition-all duration-300 hover:shadow-2xl"
          >
            <AccordionTrigger className="py-6 text-left text-lg font-semibold text-[#261311] hover:no-underline">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="pb-6 leading-7 text-[#4D2E22]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  </section>
);
}