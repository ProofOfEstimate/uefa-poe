import { Match } from "@/lib/dummyData";
import { MatchCard } from "./match-card";

export const MatchDay = ({
  id,
  title,
  matches,
}: {
  id: string;
  title: string;
  matches: Match[];
}) => (
  <div className="mb-8">
    <h2 id={id} className="text-4xl font-bold mb-8 text-center">
      {title}
    </h2>
    <div className="flex flex-wrap justify-center gap-5 md:gap-x-10">
      {matches.map((match: Match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  </div>
);
