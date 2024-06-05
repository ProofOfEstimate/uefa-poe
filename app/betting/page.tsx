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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const Betting = () => {
  return (
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
          <Dialog>
            <DialogTrigger>
              <Button asChild>
                <div>Quick Tour</div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Carousel className="mx-8">
                <CarouselContent>
                  <CarouselItem>
                    <div className="flex flex-col gap-4">
                      <div className="text-lg md:text-xl font-bold">
                        Predict Probabilities, not just outcomes!
                      </div>
                      <div>
                        With Poe, you predict how likely something is to happen.
                        Your betting stake goes into a pool. Poe uses a special
                        system to score your forecast and determine your payout.
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex flex-col gap-4">
                      <div className="text-lg md:text-xl font-bold">
                        Always in the Game!
                      </div>
                      <div>
                        Update your beliefs as you learn more and the match
                        progresses. Poe will calculate a time-averaged score
                        after the end of the match which determines your payout.
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex flex-col gap-4">
                      <div className="text-lg md:text-xl font-bold">
                        Get rewarded for your insights!
                      </div>
                      <div>
                        If you are right, you make a profit in expectation.
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </DialogContent>
          </Dialog>

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
};

export default Betting;
