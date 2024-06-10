import { useQuery } from "@tanstack/react-query";
import { Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";
import { UserAccount } from "@/lib/types";

const allUserAccounts = "allUserAccounts";

const getAllUserPredictions = async (program: Program<Poe>) => {
  const accounts = await program.account.user.all();

  return accounts.sort((a, b) => b.account.score - a.account.score);
};

const useAllUserAccounts = (program: Program<Poe>) => {
  return useQuery({
    queryKey: [allUserAccounts],
    queryFn: async () => await getAllUserPredictions(program),
    staleTime: Infinity,
    enabled: !!program,
  });
};

export { useAllUserAccounts, getAllUserPredictions, allUserAccounts };
