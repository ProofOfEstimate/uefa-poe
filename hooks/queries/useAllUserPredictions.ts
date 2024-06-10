import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";

const allUserEstimatesKey = "allUserEstimates";

const getAllUserPredictions = async (
  program: Program<Poe>,
  publicKey: PublicKey | null
) => {
  if (publicKey) {
    return await program.account.userEstimate.all([
      {
        memcmp: {
          offset: 8, // discriminator
          bytes: publicKey.toBase58(),
        },
      },
    ]);
  } else {
    return null;
  }
};

const useAllUserPredictions = (
  program: Program<Poe>,
  publicKey: PublicKey | null
) => {
  return useQuery({
    queryKey: [allUserEstimatesKey, publicKey?.toBase58() || ""],
    queryFn: async () => await getAllUserPredictions(program, publicKey),
    staleTime: Infinity,
    enabled: !!program,
  });
};

export { useAllUserPredictions, getAllUserPredictions, allUserEstimatesKey };
