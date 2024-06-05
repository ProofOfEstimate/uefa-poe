import { Poe } from "@/idl/poe";
import { BN, Program } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSolBalanceKey } from "../queries/useUserSolBalance";
import { userEstimateKey } from "../queries/useUserEstimateByPoll";
import { pollByIdKey } from "../queries/usePollById";
import { userScoreKey } from "../queries/useUserScore";
import { WalletNotConnectedError } from "@/errors/WalletNotConnectedError";
import { useToast } from "@/components/ui/use-toast";
import {
  connectWalletText,
  transactionSuccessfullText,
} from "@/texts/toastTitles";
import { sendVersionedTransaction } from "../../utils/sendVersionedTransaction";

const updateEstimate = async (
  program: Program<Poe>,
  connection: Connection,
  wallet: WalletContextState,
  pollId: number,
  lowerEstimate: number | undefined,
  upperEstimate: number | undefined
) => {
  if (!wallet.publicKey) {
    throw new WalletNotConnectedError(connectWalletText);
  }

  const [pollPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 8)],
    program.programId
  );

  let pollAccount = await program.account.poll.fetch(pollPda);

  let [userEstimatePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_estimate"),
      pollPda.toBuffer(),
      wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  let userEstimateAccount = await program.account.userEstimate.fetch(
    userEstimatePda
  );

  let [userEstimateUpdatePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_estimate_update"),
      pollPda.toBuffer(),
      wallet.publicKey.toBuffer(),
      userEstimateAccount.numEstimateUpdates.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  let [estimateUpdatePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("poll_estimate_update"),
      pollPda.toBuffer(),
      pollAccount.numEstimateUpdates.toArrayLike(Buffer, "le", 8),
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

  const updateEstimateInstruction = await program.methods
    .updateEstimate(
      lowerEstimate !== undefined ? lowerEstimate : 0,
      upperEstimate !== undefined ? upperEstimate : 0
    )
    .accountsPartial({
      poll: pollPda,
      userEstimate: userEstimatePda,
      userEstimateUpdate: userEstimateUpdatePda,
      estimateUpdate: estimateUpdatePda,
      scoringList: scoreListPda,
      userScore: userScorePda,
    })
    .instruction();

  await sendVersionedTransaction(
    [updateEstimateInstruction],
    wallet,
    connection
  );
};

const useUpdateEstimate = (
  program: Program<Poe>,
  connection: Connection,
  wallet: WalletContextState
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      pollId,
      lowerEstimate,
      upperEstimate,
    }: {
      pollId: number;
      lowerEstimate: number | undefined;
      upperEstimate: number | undefined;
    }) =>
      updateEstimate(
        program,
        connection,
        wallet,
        pollId,
        lowerEstimate,
        upperEstimate
      ),
    onSuccess: (_, variables) => {
      toast({
        variant: "default",
        title: transactionSuccessfullText,
        description: "Estimate updated.",
      });
      queryClient.invalidateQueries({
        queryKey: [
          userEstimateKey,
          variables.pollId,
          connection.rpcEndpoint,
          wallet.publicKey?.toBase58() || "",
        ],
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
        queryKey: [
          userSolBalanceKey,
          connection.rpcEndpoint,
          wallet.publicKey?.toBase58() || "",
        ],
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

export { useUpdateEstimate };
