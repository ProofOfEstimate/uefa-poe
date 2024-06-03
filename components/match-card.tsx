import { Match } from "@/lib/dummyData";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import Image from "next/image";

export const MatchCard = ({ match }: { match: Match }) => {
  console.log("match", match);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 min-w-[26rem]">
      <div className="font-medium text-lg mb-2">{match.date}</div>
      <div className="flex justify-between mb-2">
        <div className="flex justify-evenly w-full">
          <Image
            width={48}
            height={36}
            alt="Flag of team A"
            src={match.logoA ? match.logoA : "https://via.placeholder.com/50"}
          />
          <span>{match.teamA}</span>
        </div>

        <span>vs</span>
        <div className="flex justify-evenly w-full">
          <Image
            width={48}
            height={36}
            alt="Flag of team B"
            src={match.logoB ? match.logoB : "https://via.placeholder.com/50"}
          />
          <span>{match.teamB}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between mb-2">
        <label className="block text-sm font-medium">
          Prob. that {match.teamA} wins
        </label>
        <Slider defaultValue={[33]} max={100} step={1} className="mt-2" />
      </div>
      <Button className="mt-3 text-white font-bold py-2 px-4 rounded w-full ">
        Submit Estimate
      </Button>
    </div>
  );
};
