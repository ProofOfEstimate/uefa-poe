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
import { Separator } from "./ui/separator";

const MarketStats = ({
  matchId,
  profitScore,
  reputationScore,
}: {
  matchId: number;
  profitScore: string;
  reputationScore: string;
}) => {
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
        <Separator className="my-2" />
        <div className="flex gap-4">
          <p>Your profit:</p>
          <p>{profitScore}</p>
        </div>
        <div className="flex gap-4">
          <p>Your score:</p>
          <p>{reputationScore}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketStats;
