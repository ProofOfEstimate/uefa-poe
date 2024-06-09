"use client";

import TableRow from "@/components/TableRow";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllUserAccounts } from "@/hooks/queries/useAllUserAccounts";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import React from "react";

const Leaderboard = () => {
  const program = useAnchorProgram();
  const { data: userScores, isLoading: isScoresLoading } =
    useAllUserAccounts(program);

  const scores = userScores?.map((account, i) => {
    return {
      number: i + 1,
      name:
        account.account.userAddress.toBase58().slice(0, 4) +
        "..." +
        account.account.userAddress.toBase58().slice(-4),
      points: account.account.score.toFixed(2),
      isGold: i == 0,
    };
  });

  return (
    <div className="h-full w-full min-h-screen flex items-center justify-center">
      <main className="w-[40rem] h-[43rem] bg-white shadow-[0px_5px_15px_8px_#e4e7fb] flex flex-col items-center rounded-lg">
        <div
          id="header"
          className="w-full flex items-center justify-between p-10"
        >
          <h1 className="font-rubik text-[1.7rem] text-[#141a39] uppercase cursor-default">
            Ranking
          </h1>
        </div>
        <div id="leaderboard" className="w-full relative">
          <div className="w-full h-[5.5rem] bg-[#5c5be5] absolute top-[-0.5rem] shadow-[0px_15px_11px_-6px_#7a7a7d]">
            <div className="absolute bottom-[-0.8rem] left-[0.35rem] w-[1.5rem] h-[1.5rem] bg-[#5c5be5] rotate-45 z-[-1]"></div>
            <div className="absolute bottom-[-0.8rem] right-[0.35rem] w-[1.5rem] h-[1.5rem] bg-[#5c5be5] rotate-45 z-[-1]"></div>
          </div>
          {scores == undefined ? (
            <Skeleton />
          ) : (
            <table className="w-full border-collapse table-fixed text-[#141a39] cursor-default mb-20">
              {scores.map((row, index) => (
                <TableRow key={index} {...row} />
              ))}
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
