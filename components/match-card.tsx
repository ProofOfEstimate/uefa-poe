"use client";

import { Match } from "@/lib/dummyData";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useUserEstimateByPoll } from "@/hooks/queries/useUserEstimateByPoll";
import { useMakeEstimate } from "@/hooks/mutations/useMakeEstimate";
import { useUserScore } from "@/hooks/queries/useUserScore";
import { useUpdateEstimate } from "@/hooks/mutations/useUpdateEstimate";
import { useCollectPoints } from "@/hooks/mutations/useCollectPoints";
import { useEffect, useRef, useState } from "react";
import { usePollById } from "@/hooks/queries/usePollById";
import { Skeleton } from "./ui/skeleton";
import { TbLoader2 } from "react-icons/tb";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import clsx from "clsx";
import { Badge } from "./ui/badge";

export const MatchCard = ({ match }: { match: Match }) => {
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();

  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible =
    useIntersectionObserver(ref, { threshold: 0.1 }) &&
    match.teamA !== "tbd" &&
    match.teamB !== "tbd";

  const matchId = Number.parseInt(match.id) - 1;
  const {
    data: userEstimate,
    isError: isErrorEstimate,
    error: errorEstimate,
    isLoading: isLoadingEstimate,
  } = useUserEstimateByPoll(
    program,
    connection,
    wallet.publicKey,
    matchId,
    isVisible
  );

  const {
    data: poll,
    isLoading: isLoadingPoll,
    isError: isErrorPoll,
    error: errorPoll,
  } = usePollById(program, matchId, isVisible);

  const { data: userScore, isLoading: isLoadingScore } = useUserScore(
    program,
    connection,
    wallet.publicKey,
    matchId,
    isVisible
  );

  const { mutate: submitEstimate, isPending: isSubmitting } = useMakeEstimate(
    program,
    connection,
    wallet
  );
  const { mutate: updateEstimate, isPending: isUpdating } = useUpdateEstimate(
    program,
    connection,
    wallet
  );
  const { mutate: collectPoints, isPending: isCollecting } = useCollectPoints(
    program,
    connection,
    wallet
  );

  const [estimate, setEstimate] = useState(
    userEstimate !== null && userEstimate !== undefined
      ? (userEstimate.lowerEstimate + userEstimate.upperEstimate) / 2
      : undefined
  );

  useEffect(() => {
    if (userEstimate !== null && userEstimate !== undefined) {
      setEstimate(
        (userEstimate.lowerEstimate + userEstimate.upperEstimate) / 2
      );
    }
  }, [userEstimate]);

  const handleChange = (estimate: [number]) => {
    setEstimate(estimate[0]);
  };

  const isLive = poll?.hasStarted && poll?.result == null;

  return (
    <Card ref={ref} className="w-full mx-4 sm:mx-0 sm:w-[25rem]">
      <CardHeader>
        <CardDescription>
          <div className="flex justify-between">
            {match.date}
            {isLive && (
              <Badge>
                <span className="block w-[6px] h-[6px] bg-red-500 rounded-full drop-shadow-[0_0px_8px_#F7931A10)] animate-ping mr-2"></span>
                Live
              </Badge>
            )}
          </div>
        </CardDescription>
        <CardTitle className="flex w-1/2 gap-4 items-center">
          <Image
            width={36}
            height={27}
            alt="Flag of team A"
            src={match.logoA ? match.logoA : "https://via.placeholder.com/50"}
          />
          <span className="text-lg font-bold">{match.teamA}</span>
          <span className="ml-auto">{match.resultA}</span>
        </CardTitle>
        <CardTitle className="flex w-1/2 gap-4 pt-4 items-center">
          <Image
            width={36}
            height={27}
            alt="Flag of team B"
            src={match.logoB ? match.logoB : "https://via.placeholder.com/50"}
          />
          <span className="text-lg font-bold">{match.teamB}</span>
          <span className="ml-auto">{match.resultB}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <p className="block text-md font-semibold mb-2">
          Prob. that {match.teamA} wins
        </p>
        <div className="flex w-3/5 sm:w-1/2 justify-between">
          <p className="block text-sm">Market Prediction:</p>
          <p className="text-sm font-bold">
            {poll && poll.collectiveEstimate !== null
              ? (poll.collectiveEstimate / 10000).toFixed(0) + "%"
              : "-"}
          </p>
        </div>
        <div className="flex w-3/5 sm:w-1/2 justify-between">
          <p className="block text-sm">Your Prediction:</p>
          <p
            className={clsx(
              "text-sm font-bold",
              estimate !== userEstimate?.lowerEstimate
                ? "dark:text-yellow-300"
                : ""
            )}
          >
            {estimate !== undefined ? estimate + "%" : "-"}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Slider
            onValueChange={handleChange}
            value={[estimate !== undefined ? estimate : 50]}
            max={100}
            step={1}
            className="my-4"
            disabled={poll?.result !== null}
          />
          <Button
            variant={"secondary"}
            disabled={poll?.result !== null}
            size={"sm"}
            onClick={() => {
              if (userEstimate !== null && userEstimate !== undefined) {
                setEstimate(
                  (userEstimate.lowerEstimate + userEstimate.upperEstimate) / 2
                );
              } else {
                setEstimate(undefined);
              }
            }}
          >
            Reset
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4 items-center justify-between">
          {isLoadingPoll ? (
            <Skeleton className="w-3/5 h-9 rounded-md" />
          ) : poll?.result !== null ? (
            userScore === null || userScore === undefined || isLoadingScore ? (
              <div>
                {poll !== undefined ? (
                  poll.result ? (
                    <div className="text-primary font-bold">
                      {match.teamA} won!
                    </div>
                  ) : (
                    <div className="text-primary font-bold">
                      {match.teamA} did not win!
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              <Button
                disabled={isCollecting}
                className="w-3/5"
                onClick={() => collectPoints({ pollId: matchId })}
              >
                {isCollecting && (
                  <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Withdraw your funds
              </Button>
            )
          ) : userEstimate !== undefined && userEstimate !== null ? (
            <Button
              disabled={
                isUpdating ||
                (estimate === userEstimate.lowerEstimate &&
                  estimate === userEstimate.upperEstimate)
              }
              className="w-3/5"
              onClick={() =>
                updateEstimate({
                  pollId: matchId,
                  lowerEstimate: estimate,
                  upperEstimate: estimate,
                })
              }
            >
              {isUpdating && (
                <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Estimate
            </Button>
          ) : (
            <Button
              disabled={isSubmitting || estimate === undefined}
              className="font-bold rounded w-full "
              onClick={() =>
                submitEstimate({
                  pollId: matchId,
                  lowerEstimate: estimate,
                  upperEstimate: estimate,
                })
              }
            >
              {isSubmitting && (
                <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Bet 100 BONK
            </Button>
          )}

          <Button size={"sm"} variant={"ghost"} asChild>
            <Link className="text-xs" href={"/match/" + match.id}>
              <RiArrowRightDoubleLine className="mr-2" /> Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
