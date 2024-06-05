import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";

const pollByIdKey = "pollById";

const getPollById = async (program: Program<Poe>, pollId: number) => {
  const [pollPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 8)],
    program.programId
  );

  return await program.account.poll.fetch(pollPda);
};

const usePollById = (program: Program<Poe>, pollId: number) => {
  return useQuery({
    queryKey: [pollByIdKey, pollId],
    queryFn: async () => await getPollById(program, pollId),
    enabled: !!program,
  });
};

export { usePollById, getPollById, pollByIdKey };
