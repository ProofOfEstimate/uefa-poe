import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";

const userScoreKey = "userScore";

const getUserScore = async (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null,
  pollId: number | undefined
) => {
  if (publicKey !== null && pollId !== undefined) {
    const [pollPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    let [userScorePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_score"), pollPda.toBuffer(), publicKey.toBuffer()],
      program.programId
    );

    const userScoreAccount = await connection.getAccountInfo(userScorePda);

    if (userScoreAccount) {
      return await program.account.userScore.fetch(userScorePda);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const useUserScore = (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null,
  pollId: number | undefined
) => {
  return useQuery({
    queryKey: [
      userScoreKey,
      pollId,
      connection.rpcEndpoint,
      publicKey?.toBase58() || "",
    ],
    queryFn: async () =>
      await getUserScore(program, connection, publicKey, pollId),
    staleTime: Infinity,
    enabled: !!pollId,
  });
};

export { useUserScore, getUserScore, userScoreKey };
