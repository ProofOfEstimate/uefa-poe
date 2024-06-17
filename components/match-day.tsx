"use client";
import { Match } from "@/lib/dummyData";
import { MatchCard } from "./match-card";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export const MatchDay = ({
  id,
  title,
  matches,
}: {
  id: string;
  title: string;
  matches: Match[];
}) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="mb-8">
      <div className="flex gap-4 items-center mb-8 justify-center">
        <h2 id={id} className="text-4xl font-bold text-center">
          {title}
        </h2>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </div>
      {isVisible && (
        <div className={`flex flex-wrap justify-center gap-5 md:gap-x-10`}>
          {matches.map((match: Match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};
