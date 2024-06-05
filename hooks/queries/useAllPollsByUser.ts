import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";
import { PublicKey } from "@solana/web3.js";
import { useAllUserPredictions } from "./useAllUserPredictions";
import { Poll } from "@/lib/types";

const allPollsByUserKey = "allPollsByUser";

const getAllPollsByUser = async (
  program: Program<Poe>,
  addresses: PublicKey[] | undefined
) => {
  if (addresses !== undefined) {
    return (await program.account.poll.fetchMultiple(
      addresses
    )) as unknown as Poll[];
  } else {
    return [] as Poll[];
  }
};

const useAllPollsByUser = (
  program: Program<Poe>,
  publicKey: PublicKey | null
) => {
  const { data: userPredictions } = useAllUserPredictions(program, publicKey);
  const userPollAddresses = userPredictions?.map(
    (userPrediction) => userPrediction.account.poll
  );
  return useQuery({
    queryKey: [
      allPollsByUserKey,
      publicKey?.toBase58(),
      userPollAddresses?.length,
    ],
    queryFn: async () => await getAllPollsByUser(program, userPollAddresses),
    enabled: !!program && !!userPredictions,
    placeholderData: keepPreviousData,
  });
};

export { useAllPollsByUser, getAllPollsByUser, allPollsByUserKey };
