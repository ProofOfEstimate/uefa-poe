import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { matches } from "@/lib/dummyData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table className="min-w-[1000px]">
        <TableCaption>Group phase</TableCaption>
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
          {matches.map((match) => {
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
    </main>
  );
}
