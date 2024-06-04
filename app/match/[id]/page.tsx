"use client";

import { Button } from "@/components/ui/button";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import { allMatches } from "@/lib/dummyData";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

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
    </main>
  );
};

export default Match;
