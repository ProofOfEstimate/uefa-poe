"use client";

import { Button } from "@/components/ui/button";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import { allMatches } from "@/lib/dummyData";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

const Match = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();

  const matchId = Number.parseInt(params.id);
  const match = allMatches[matchId - 1];
  return (
    <main className="flex min-h-screen flex-col justify-start items-start px-4 sm:px-12 lg:px-16 py-4 sm:py-8">
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className="p-0 hover:bg-transparent"
      >
        <FaArrowLeftLong />
      </Button>

      <div className="text-lg font-medium mt-8">{match.date}</div>
      <div className="flex flex-col items-center gap-4 mt-2">
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

      <div>
        <div className="text-2xl font-bold mt-8">
          What is the probablity that {match.teamA} wins?
        </div>
        <div className="text-lg font-bold mt-2">Market Prediction: 72%</div>
        <div className="text-lg font-bold mt-2">Your Prediction: 52%</div>
        <Slider className="mt-4" min={0} max={100} step={1} />
      </div>
    </main>
  );
};

export default Match;
