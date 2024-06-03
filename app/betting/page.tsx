import {
  matchesFinal,
  matchesFirstMatchDay,
  matchesQuarterFinals,
  matchesRound16,
  matchesSecondMatchday,
  matchesSemiFinals,
  matchesThirdMatchday,
} from "@/lib/dummyData";
import { Separator } from "@/components/ui/separator";
import SideNav from "@/components/sidenav";
import { MatchDay } from "@/components/match-day";

const Betting = () => (
  <div>
    <h1 className="text-center p-8 text-4xl font-bold">
      UEFA Championship powered by Poe
    </h1>
    <Separator />
    <div className="flex w-full">
      <aside className="hidden md:block min-w-40 w-1/2 lg:w-1/5 border-r">
        <SideNav />
      </aside>
      <main className="flex w-full min-h-screen flex-col items-center justify-between p-4 sm:p-24">
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
  </div>
);

export default Betting;
