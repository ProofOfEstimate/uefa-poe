"use client";
import { MatchDay } from "@/components/match-day";
import QuickTourDialog from "@/components/quick-tour-dialog";
import SideNav from "@/components/sidenav";
import { Button } from "@/components/ui/button";
import { useRegisterUser } from "@/hooks/mutations/useRegisterUser";
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
} from "@/lib/dummyData";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";

export default function App() {
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();
  const { data: userAccount, isLoading: isScoreLoading } = useUserAccount(
    program,
    connection,
    wallet.publicKey
  );

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
      {wallet.publicKey && userAccount === null && !isScoreLoading && (
        <aside className="hidden sm:block right-4 pt-8 fixed">
          <Button onClick={() => registerUser()}>Mint BONK</Button>
        </aside>
      )}
    </div>
  );
}
