import { allLeagues } from "@/Data/Leagues";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Hero from "./Hero";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardClock } from "lucide-react";

function LeaguesAccordion() {
  return (
    <section
      id="all-leagues"
      className="bg-accent/20 p-4 md:p-8 pt-16 md:pt-18"
    >
      <Accordion type="single" collapsible className="w-full">
        {allLeagues.map((league, index) => (
          <AccordionItem value={`item-${index}`} key={league.id}>

            <AccordionTrigger className="font-semibold text-xl cursor-pointer data-[state=open]:text-primary">
              <span className="flex items-center gap-4">
                <Image
                  src={league.logo}
                  alt={`${league.name} logo`}
                  width={100}
                  height={100}
                  className="p-2 w-18 md:w-24"
                />
                <h1>{league.name}</h1>
              </span>
            </AccordionTrigger>

            <AccordionContent>
                <Card className="overflow-hidden p-0 gap-0">
                  {/* Banner */}
                  <Hero selectedleague={league} />
                  {/* Upcoming Events */}
                  <Card className="bg-accent rounded-none border-0">
                    <CardContent className="p-4 sm:p-8 space-y-6">
                      <div className="flex items-center gap-2">
                        <ClipboardClock className="text-primary" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gradient">
                          Upcoming Events
                        </h2>
                      </div>
                    </CardContent>
                  </Card>
                </Card>
            </AccordionContent>
            
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default LeaguesAccordion;
