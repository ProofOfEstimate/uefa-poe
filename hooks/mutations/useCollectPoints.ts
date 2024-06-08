import { Poe } from "@/idl/poe";
import { BN, Program } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userAccountKey } from "../queries/useUserAccount";
import { userSolBalanceKey } from "../queries/useUserSolBalance";
import { pollByIdKey } from "../queries/usePollById";
import { userScoreKey } from "../queries/useUserScore";
import { WalletNotConnectedError } from "@/errors/WalletNotConnectedError";
import { useToast } from "@/components/ui/use-toast";
import {
  connectWalletText,
  transactionSuccessfullText,
} from "@/texts/toastTitles";
import { sendVersionedTransaction } from "../../utils/sendVersionedTransaction";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { allPollsByUserKey } from "../queries/useAllPollsByUser";
import { allUserAccounts } from "../queries/useAllUserAccounts";

const collectPoints = async (
  program: Program<Poe>,
  connection: Connection,
  wallet: WalletContextState,
  pollId: number
) => {
  if (!wallet.publicKey) {
    throw new WalletNotConnectedError(connectWalletText);
  }

  let [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), wallet.publicKey.toBuffer()],
    program.programId
  );

  const [pollPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 8)],
    program.programId
  );

  let [userPredictionPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_estimate"),
      pollPda.toBuffer(),
      wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  let [scoreListPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("scoring_list"), pollPda.toBuffer()],
    program.programId
  );

  let [userScorePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_score"),
      pollPda.toBuffer(),
      wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  let [mintPda, mintBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("poeken_mint")],
    program.programId
  );

  let [escrowPda, _escrowBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow")],
    program.programId
  );

  const tokenAccountAddress = await getAssociatedTokenAddress(
    mintPda,
    wallet.publicKey
  );

  const registerUserInstruction = await program.methods
    .collectPoints()
    .accountsPartial({
      user: userPda,
      forecaster: wallet.publicKey,
      poll: pollPda,
      userEstimate: userPredictionPda,
      scoringList: scoreListPda,
      userScore: userScorePda,
      mint: mintPda,
      escrowAccount: escrowPda,
      forecasterTokenAccount: tokenAccountAddress,
    })
    .instruction();

  await sendVersionedTransaction([registerUserInstruction], wallet, connection);
};

const useCollectPoints = (
  program: Program<Poe>,
  connection: Connection,
  wallet: WalletContextState
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ pollId }: { pollId: number }) =>
      collectPoints(program, connection, wallet, pollId),
    onSuccess: (_, variables) => {
      toast({
        variant: "default",
        title: transactionSuccessfullText,
        description: "Points collected.",
      });
      queryClient.invalidateQueries({
        queryKey: [
          userAccountKey,
          connection.rpcEndpoint,
          wallet.publicKey?.toBase58() || "",
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [allPollsByUserKey, wallet.publicKey?.toBase58()],
      });
      queryClient.invalidateQueries({
        queryKey: [pollByIdKey, variables.pollId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          userScoreKey,
          variables.pollId,
          connection.rpcEndpoint,
          wallet.publicKey?.toBase58() || "",
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [allUserAccounts],
      });
      queryClient.invalidateQueries({
        queryKey: [
          userSolBalanceKey,
          connection.rpcEndpoint,
          wallet.publicKey?.toBase58() || "",
        ],
      });
    },
    onError: (e) => {
      toast({ variant: "destructive", title: e.name, description: e.message });
    },
  });
};

export { useCollectPoints };
