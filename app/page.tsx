"use client";
import { MatchCard } from "@/components/match-card";
import { MatchDay } from "@/components/match-day";
import QuickTourDialog from "@/components/quick-tour-dialog";
import SideNav from "@/components/sidenav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterUser } from "@/hooks/mutations/useRegisterUser";
import { useAllPolls } from "@/hooks/queries/useAllPolls";
import { useUserAccount } from "@/hooks/queries/useUserAccount";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import {
  matchesFirstMatchDay,
  matchesSecondMatchday,
  matchesThirdMatchday,
  matchesRound16,
  matchesQuarterFinals,
  matchesSemiFinals,
  matchesFinal,
  allMatches,
} from "@/lib/dummyData";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";

export default function App() {
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();

  const { data: userAccount, isLoading: isScoreLoading } = useUserAccount(
    program,
    connection,
    wallet.publicKey
  );

  const { data: allPolls, isLoading: isAllPollsLoading } = useAllPolls(program);

  const nextMarketIndex = allPolls?.filter((p) => {
    return p.result !== null;
  }).length;

  const comingMatches = allMatches.filter((match) => {
    const index = nextMarketIndex ?? 0;
    return Number.parseInt(match.id) - 1 > index;
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { mutate: registerUser } = useRegisterUser(program, connection, wallet);
  return (
    <div className="flex">
      <aside className="hidden md:block md:min-w-20 md:w-1/5">
        <SideNav />
      </aside>
      <main className="flex w-full min-h-screen flex-col items-center justify-between p-4 sm:p-12">
        <div className="block sm:hidden mb-2">
          <QuickTourDialog />
          {wallet.publicKey && userAccount === null && !isScoreLoading && (
            <Button className="sm:hidden ml-4" onClick={() => registerUser()}>
              Mint BONK
            </Button>
          )}
        </div>

        <div className="text-4xl font-bold mb-4">Next Match</div>

        {nextMarketIndex ? (
          <MatchCard match={allMatches[nextMarketIndex]} />
        ) : (
          <Skeleton className="h-[350px] w-[400px] rounded-xl" />
        )}
        <Tabs defaultValue="coming" className="w-full mx-auto my-8 text-center">
          <TabsList>
            <TabsTrigger value="all">All Matches</TabsTrigger>
            <TabsTrigger value="coming">Coming Matches</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllMatches />
          </TabsContent>
          <TabsContent value="coming">
            <MatchDay
              id="coming"
              title="Coming Matches"
              matches={comingMatches}
            />
          </TabsContent>
        </Tabs>
      </main>
      {isVisible && (
        <aside className="right-8 bottom-16 fixed">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <FaChevronUp />
          </Button>
        </aside>
      )}

      {wallet.publicKey && userAccount === null && !isScoreLoading && (
        <aside className="hidden sm:block right-4 pt-8 fixed">
          <Button onClick={() => registerUser()}>Mint BONK</Button>
        </aside>
      )}
    </div>
  );
}

const AllMatches = () => {
  return (
    <>
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
    </>
  );
};
