import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSolBalanceKey } from "../queries/useUserSolBalance";
import { useToast } from "@/components/ui/use-toast";
import {
  connectWalletText,
  transactionSuccessfullText,
} from "@/texts/toastTitles";
import { WalletNotConnectedError } from "@/errors/WalletNotConnectedError";

const airdropSol = async (
  connection: Connection,
  wallet: WalletContextState
) => {
  if (!wallet.publicKey) {
    throw new WalletNotConnectedError(connectWalletText);
  }

  const [latestBlockhash, signature] = await Promise.all([
    connection.getLatestBlockhash(),
    connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL),
  ]);
  await connection.confirmTransaction(
    { signature, ...latestBlockhash },
    "confirmed"
  );
};

const useAirdropSol = (connection: Connection, wallet: WalletContextState) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => airdropSol(connection, wallet),
    onSuccess: () => {
      toast({
        variant: "default",
        title: transactionSuccessfullText,
        description: "Airdrop was confirmed",
      });
      queryClient.invalidateQueries({
        queryKey: [userSolBalanceKey],
      });
    },
    onError: (e) => {
      toast({
        variant: "destructive",
        title: e.name,
        description: e.message,
      });
    },
  });
};

export { useAirdropSol };
