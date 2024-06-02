"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
  matchesFinal,
  matchesFirstMatchDay,
  matchesQuarterFinals,
  matchesRound16,
  matchesSecondMatchday,
  matchesSemiFinals,
  matchesThirdMatchday,
} from "@/lib/dummyData";
import { Separator } from "@/components/ui/separator";

const MatchCard = ({ match }: { match: any }) => {
  console.log("match", match);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <div className="font-medium text-lg mb-2">{match.date}</div>
      <div className="flex justify-between mb-2">
        <div className="flex justify-evenly w-full">
          <img
            src={match.logoA ? match.logoA : "https://via.placeholder.com/50"}
          />
          <span>{match.teamA}</span>
        </div>

        <span>vs</span>
        <div className="flex justify-evenly w-full">
          <img
            src={match.logoB ? match.logoB : "https://via.placeholder.com/50"}
          />
          <span>{match.teamB}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between mb-2">
        <label className="block text-sm font-medium">
          Prob. that {match.teamA} wins
        </label>
        <Slider />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded w-full ">
        Submit
      </button>
    </div>
  );
};

const MatchDay = ({ title, matches }: { title: string; matches: any }) => (
  <div className="mb-8">
    <h2 className="text-4xl font-bold mb-8 text-center">{title}</h2>
    <div className="flex flex-wrap justify-center gap-5">
      {matches.map((match: any) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  </div>
);
const App = () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
    <MatchDay title="Matchday 1" matches={matchesFirstMatchDay} />
    <MatchDay title="Matchday 2" matches={matchesSecondMatchday} />
    <MatchDay title="Matchday 3" matches={matchesThirdMatchday} />
    <MatchDay title="Round of 16" matches={matchesRound16} />
    <MatchDay title="Quarter Finals" matches={matchesQuarterFinals} />
    <MatchDay title="Semi Finals" matches={matchesSemiFinals} />
    <MatchDay title="Final" matches={matchesFinal} />
  </main>
);

export default App;
