import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";

const userEstimateKey = "userEstimate";

const getUserEstimateByPoll = async (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null,
  pollId: number
) => {
  if (publicKey) {
    const [pollPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    let [userPredictionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_estimate"), pollPda.toBuffer(), publicKey.toBuffer()],
      program.programId
    );

    const userPredictionAccount = await connection.getAccountInfo(
      userPredictionPda
    );

    if (userPredictionAccount) {
      return await program.account.userEstimate.fetch(userPredictionPda);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const useUserEstimateByPoll = (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null,
  pollId: number
) => {
  return useQuery({
    queryKey: [
      userEstimateKey,
      pollId,
      connection.rpcEndpoint,
      publicKey?.toBase58() || "",
    ],
    queryFn: async () =>
      await getUserEstimateByPoll(program, connection, publicKey, pollId),
    staleTime: Infinity,
    enabled: !!program,
  });
};

export { useUserEstimateByPoll, getUserEstimateByPoll, userEstimateKey };
