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

export const MatchCard = ({ match }: { match: Match }) => {
  return (
    <Card className="w-full mx-4 sm:mx-0 sm:w-[25rem]">
      <CardHeader>
        <CardDescription>{match.date}</CardDescription>
        <CardTitle className="flex gap-4">
          <Image
            width={36}
            height={27}
            alt="Flag of team A"
            src={match.logoA ? match.logoA : "https://via.placeholder.com/50"}
          />
          <span className="text-lg font-bold">{match.teamA}</span>
        </CardTitle>
        <CardTitle className="flex gap-4 pt-4">
          <Image
            width={36}
            height={27}
            alt="Flag of team B"
            src={match.logoB ? match.logoB : "https://via.placeholder.com/50"}
          />
          <span className="text-lg font-bold">{match.teamB}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <p className="block text-md font-semibold mb-2">
          Prob. that {match.teamA} wins
        </p>
        <p className="block text-sm">Market Prediction: 42%</p>
        <p className="block text-sm">Your Prediction: 75%</p>
        <div className="flex gap-4 items-center">
          <Slider
            onClick={(e) => e.stopPropagation()}
            defaultValue={[33]}
            max={100}
            step={1}
            className="my-4"
          />
          <Button variant={"secondary"} size={"sm"}>
            Reset
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4 items-center justify-between">
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-white font-bold rounded w-full "
          >
            Submit Estimate
          </Button>
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
