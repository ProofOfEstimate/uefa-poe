"use client";

import { Button } from "@/components/ui/button";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import { allMatches } from "@/lib/dummyData";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { usePollById } from "@/hooks/queries/usePollById";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserEstimateByPoll } from "@/hooks/queries/useUserEstimateByPoll";
import clsx from "clsx";
import { TbLoader2 } from "react-icons/tb";
import { useMakeEstimate } from "@/hooks/mutations/useMakeEstimate";
import { useUpdateEstimate } from "@/hooks/mutations/useUpdateEstimate";
import { useCollectPoints } from "@/hooks/mutations/useCollectPoints";
import { useUserScore } from "@/hooks/queries/useUserScore";
import MarketStats from "@/components/market-stats";
import { useEstimateUpdatesByPoll } from "@/hooks/queries/useEstimateUpdatesByPoll";

const Match = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();

  const matchId = Number.parseInt(params.id) - 1;
  const match = allMatches[matchId];

  const { data: poll, isLoading: isLoadingPoll } = usePollById(
    program,
    matchId,
    true
  );

  const { data: estimateUpdates } = useEstimateUpdatesByPoll(
    program,
    matchId,
    wallet.publicKey
  );

  const [brushStartIndex, setBrushStartIndex] = useState<number>();
  const [brushEndIndex, setBrushEndIndex] = useState<number>();

  const handleBrushChange = ({
    startIndex,
    endIndex,
  }: {
    startIndex?: number;
    endIndex?: number;
  }) => {
    setBrushStartIndex(startIndex);
    setBrushEndIndex(endIndex);
  };
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
    true
  );

  const [estimate, setEstimate] = useState(
    userEstimate !== null && userEstimate !== undefined
      ? (userEstimate.lowerEstimate + userEstimate.upperEstimate) / 2
      : undefined
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

  const { data: userScore, isLoading: isLoadingScore } = useUserScore(
    program,
    connection,
    wallet.publicKey,
    matchId,
    true
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

  return (
    <main className="flex min-h-screen flex-col justify-start items-start px-4 sm:px-12 lg:px-16 py-4 sm:py-8 w-full">
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className="p-0 hover:bg-transparent"
      >
        <FaArrowLeftLong />
      </Button>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="basis-2/3">
          <div className="text-lg font-medium mt-8">{match.date}</div>
          <div className="flex flex-col items-start gap-4 mt-2">
            <div className="flex items-center gap-4">
              <Image
                width={36}
                height={27}
                alt="Flag of team A"
                src={
                  match.logoA ? match.logoA : "https://via.placeholder.com/50"
                }
              />
              <div className="text-xl font-bold">{match.teamA}</div>{" "}
              <span className="text-lg font-bold ml-8">{match.resultA}</span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                width={36}
                height={27}
                alt="Flag of team B"
                src={
                  match.logoB ? match.logoB : "https://via.placeholder.com/50"
                }
              />
              <div className="text-xl font-bold">{match.teamB}</div>{" "}
              <span className="text-lg font-bold ml-8">{match.resultB}</span>
            </div>
          </div>

          {poll ? (
            <div className="text-2xl font-bold mt-8">{poll?.question}</div>
          ) : (
            <Skeleton />
          )}
          <div className="flex w-40 justify-between">
            <p className="block text-sm">Market Prediction:</p>
            <p className="text-sm">
              {poll && poll.collectiveEstimate !== null
                ? (poll.collectiveEstimate / 10000).toFixed(0) + "%"
                : "-"}
            </p>
          </div>
          <div className="flex w-40 justify-between">
            <p className="block text-sm">Your Prediction:</p>
            <p
              className={clsx(
                "text-sm",
                estimate !== userEstimate?.lowerEstimate ? "text-red-400" : ""
              )}
            >
              {estimate !== undefined ? estimate + "%" : "-"}
            </p>
          </div>
          <div className="flex w-5/6 sm:w-1/2 md:w-2/3 gap-4 items-center my-4">
            <Slider
              className="hover:cursor-pointer"
              onValueChange={handleChange}
              value={[estimate !== undefined ? estimate : 0]}
              min={0}
              max={100}
              step={1}
              disabled={poll?.result !== null}
            />
            <Button
              variant={"secondary"}
              disabled={poll?.result !== null}
              size={"sm"}
              onClick={() => {
                if (userEstimate !== null && userEstimate !== undefined) {
                  setEstimate(
                    (userEstimate.lowerEstimate + userEstimate.upperEstimate) /
                      2
                  );
                } else {
                  setEstimate(undefined);
                }
              }}
            >
              Reset
            </Button>
          </div>
          {isLoadingPoll ? (
            <Skeleton className="w-40 h-9 rounded-md" />
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
                className="w-fit"
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
              className="w-fit"
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
              className="font-bold rounded w-fit"
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
              Submit Estimate
            </Button>
          )}
        </div>
        <MarketStats
          matchId={matchId}
          profitScore={
            poll?.result !== null &&
            userEstimate !== null &&
            userEstimate !== undefined &&
            userEstimate.payoutScore
              ? ((userEstimate.payoutScore - 1) * 100).toFixed(2)
              : ""
          }
          reputationScore={
            poll?.result !== null &&
            userEstimate !== null &&
            userEstimate !== undefined &&
            userEstimate.reputationScore
              ? userEstimate.reputationScore?.toFixed(2)
              : ""
          }
        />
      </div>
      <div className="w-full border rounded-lg p-8 mt-8">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={estimateUpdates}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              type="number"
              domain={[]}
              tickFormatter={(number) =>
                new Date(number * 1000).toLocaleString()
              }
              tickCount={10}
            />
            <YAxis />
            <Tooltip
              formatter={(value, name, prop) => {
                switch (name) {
                  case "confidenceInterval":
                    prop.color = "hsl(0 0% 100%)";

                    return [undefined, undefined];
                  case "estimate":
                    const interval =
                      prop.payload.confidenceInterval[1] -
                      prop.payload.confidenceInterval[0];
                    return [
                      Number(value).toFixed(2) +
                        "%  ± " +
                        (interval / 2).toFixed(1) +
                        "%",
                      "Market Prediction",
                    ];

                  default:
                    return [undefined, undefined];
                }
              }}
              labelFormatter={(label) =>
                new Date(label * 1000).toLocaleString()
              }
            />

            <Area
              type="monotone"
              dataKey="confidenceInterval"
              fill="hsl(var(--primary))"
              opacity={0.2}
              stroke="#ffffff00"
              activeDot={false}
              isAnimationActive={false}
            />
            <Line
              dot={false}
              type="linear"
              dataKey="estimate"
              stroke="hsl(var(--primary))"
              isAnimationActive={false}
            />
            <Brush
              dataKey="name"
              height={30}
              stroke="#8884d8"
              onChange={handleBrushChange}
              startIndex={brushStartIndex}
              endIndex={brushEndIndex}
              tickFormatter={(number) =>
                new Date(number * 1000).toLocaleString()
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-16 text-xl font-bold">Details</div>
      <div className="pt-4 pb-16 text-lg w-full sm:w-5/6 md:w-1/2">
        This market will resolve to true if {match.teamA} wins against{" "}
        {match.teamB}. In any other case, e.g. a draw, {match.teamB} wins or the
        game is canceled, this market will resolve to false.
      </div>
    </main>
  );
};

export default Match;
