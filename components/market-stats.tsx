"use client";

import useAnchorProgram from "@/hooks/useAnchorProgram";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { usePollById } from "@/hooks/queries/usePollById";

const MarketStats = ({ matchId }: { matchId: number }) => {
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();

  const { data: poll, isLoading: isLoadingPoll } = usePollById(
    program,
    matchId,
    true
  );
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Additional Data 📊</CardTitle>
      </CardHeader>
      <CardContent>
        {poll ? (
          <div className="">
            {poll.numForecasters.toString()} participant
            {poll.numForecasters.toNumber() !== 1 ? "s" : ""}
          </div>
        ) : (
          <Skeleton className="w-8 h-5 rounded-md" />
        )}
        <p>Your profit:</p>
        <p>Your score:</p>
      </CardContent>
    </Card>
  );
};

export default MarketStats;
