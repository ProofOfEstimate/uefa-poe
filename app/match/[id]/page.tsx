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
import { useState } from "react";

const Match = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();

  const matchId = Number.parseInt(params.id);
  const match = allMatches[matchId - 1];

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

  const estimateUpdates = [
    { name: 1342234000, estimate: 89, confidenceInterval: [87, 91] },
    { name: 1349234000, estimate: 89, confidenceInterval: [87, 91] },
    { name: 1349234000, estimate: 62, confidenceInterval: [52, 72] },
    { name: 1359234000, estimate: 62, confidenceInterval: [52, 72] },
  ];
  return (
    <main className="flex min-h-screen flex-col justify-start items-start px-4 sm:px-12 lg:px-16 py-4 sm:py-8 w-full">
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className="p-0 hover:bg-transparent"
      >
        <FaArrowLeftLong />
      </Button>

      <div className="text-lg font-medium mt-8">{match.date}</div>
      <div className="flex flex-col items-start gap-4 mt-2">
        <div className="flex items-center gap-4">
          <Image
            width={36}
            height={27}
            alt="Flag of team A"
            src={match.logoA ? match.logoA : "https://via.placeholder.com/50"}
          />
          <div className="text-xl font-bold">{match.teamA}</div>
        </div>
        <div className="flex items-center gap-4">
          <Image
            width={36}
            height={27}
            alt="Flag of team B"
            src={match.logoB ? match.logoB : "https://via.placeholder.com/50"}
          />
          <div className="text-xl font-bold">{match.teamB}</div>
        </div>
      </div>

      <div className="text-2xl font-bold mt-8">
        Will {match.teamA} win against {match.teamB}?
      </div>
      <div className="text-lg font-bold mt-2">Market Prediction: 72%</div>
      <div className="text-lg font-bold mt-2">Your Prediction: 52%</div>
      <Slider
        className="mt-4 w-5/6 sm:w-1/2 md:w-1/3"
        min={0}
        max={100}
        step={1}
      />
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
