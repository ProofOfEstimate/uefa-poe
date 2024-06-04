"use client";

import { Match } from "@/lib/dummyData";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const MatchCard = ({ match }: { match: Match }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/match/${match.id}`);
      }}
      className="bg-white shadow-md rounded-lg p-4 mb-4 min-w-[26rem] hover:cursor-pointer"
    >
      <div className="font-medium text-lg mb-2">{match.date}</div>
      <div className="flex justify-between mb-2">
        <div className="flex justify-evenly w-full items-center">
          <Image
            width={36}
            height={27}
            alt="Flag of team A"
            src={match.logoA ? match.logoA : "https://via.placeholder.com/50"}
          />
          <span className="text-lg font-bold">{match.teamA}</span>
        </div>

        <span>vs</span>
        <div className="flex justify-evenly w-full items-center">
          <Image
            width={36}
            height={27}
            alt="Flag of team B"
            src={match.logoB ? match.logoB : "https://via.placeholder.com/50"}
          />
          <span className="text-lg font-bold">{match.teamB}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between mb-2">
        <label className="block text-sm font-medium">
          Prob. that {match.teamA} wins
        </label>
        <Slider
          onClick={(e) => e.stopPropagation()}
          defaultValue={[33]}
          max={100}
          step={1}
          className="mt-2"
        />
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="mt-3 text-white font-bold py-2 px-4 rounded w-full "
      >
        Submit Estimate
      </Button>
    </div>
  );
};
