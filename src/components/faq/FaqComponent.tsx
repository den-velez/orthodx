"use client";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { FAQ_TEXTS } from "@/constants/constants";
import "./styles.css";

export default function FaqComponent() {
  return (
    <>
      <Accordion className='flex flex-col items-start gap-3 text-txtBrand-alternative '>
        {FAQ_TEXTS.map(({ question, answer }, i) => (
          <AccordionItem header={question} key={i} className='w-full text-left'>
            <p className='px-3 text-small'>{answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
