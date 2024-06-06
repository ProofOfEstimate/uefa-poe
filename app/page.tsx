"use client";
import { MatchDay } from "@/components/match-day";
import SideNav from "@/components/sidenav";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  matchesFirstMatchDay,
  matchesSecondMatchday,
  matchesThirdMatchday,
  matchesRound16,
  matchesQuarterFinals,
  matchesSemiFinals,
  matchesFinal,
} from "@/lib/dummyData";
import React from "react";

export default function App() {
  return (
    <div className="flex">
      <aside className="hidden md:block md:min-w-20 md:w-1/5">
        <SideNav />
      </aside>
      <main className="flex w-full min-h-screen flex-col items-center justify-between p-4 sm:p-12">
        <MatchDay
          id="matchday1"
          title="Matchday 1"
          matches={matchesFirstMatchDay}
        />
        <MatchDay
          id="matchday2"
          title="Matchday 2"
          matches={matchesSecondMatchday}
        />
        <MatchDay
          id="matchday3"
          title="Matchday 3"
          matches={matchesThirdMatchday}
        />
        <MatchDay id="round16" title="Round of 16" matches={matchesRound16} />
        <MatchDay
          id="quarter"
          title="Quarter Finals"
          matches={matchesQuarterFinals}
        />
        <MatchDay id="semi" title="Semi Finals" matches={matchesSemiFinals} />
        <MatchDay id="final" title="Final" matches={matchesFinal} />
      </main>
    </div>
  );
}
