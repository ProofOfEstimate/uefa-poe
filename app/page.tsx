import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 id="matchday1" className="text-4xl font-bold mb-4">
        Matchday 1
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesFirstMatchDay.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
      <h2 id="matchday2" className="text-4xl font-bold mt-8">
        Matchday 2
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesSecondMatchday.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
      <h2 id="matchday3" className="text-4xl font-bold mt-8">
        Matchday 3
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesThirdMatchday.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
      <h2 id="round16" className="text-4xl font-bold mt-8">
        Round of 16
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesRound16.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
      <h2 id="quarter" className="text-4xl font-bold mt-8">
        Quarter Finals
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesQuarterFinals.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
      <h2 id="semi" className="text-4xl font-bold mt-8">
        Semi Finals
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesSemiFinals.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
      <h2 id="final" className="text-4xl font-bold mt-8">
        Final
      </h2>
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Prob. that Team A wins</TableHead>
            <TableHead>Prob. that Team B wins</TableHead>
            <TableHead>Prob. of a draw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesFinal.map((match) => {
            return (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.date}</TableCell>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
                <TableCell>
                  <Input className="w-fit" type="number" min={0} max={100} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator />
    </main>
  );
}
