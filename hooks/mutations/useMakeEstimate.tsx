import React from "react";
import { Poe } from "@/idl/poe";
import { BN, Program } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pollByIdKey } from "../queries/usePollById";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { NoUserAccountError } from "@/errors/NoUserAccountError";
import { ToastAction } from "@/components/ui/toast";
import { WalletNotConnectedError } from "@/errors/WalletNotConnectedError";
import {
  connectWalletText,
  transactionSuccessfullText,
} from "@/texts/toastTitles";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { userAccountKey } from "../queries/useUserAccount";
import { sendVersionedTransaction } from "../../utils/sendVersionedTransaction";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { userSolBalanceKey } from "../queries/useUserSolBalance";
import { userScoreKey } from "../queries/useUserScore";
import { userEstimateKey } from "../queries/useUserEstimateByPoll";
import { useRegisterUser } from "./useRegisterUser";

const makeEstimate = async (
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

  let [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  const userAccount = await connection.getAccountInfo(userPda);

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

  let [userEstimateUpdatePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_estimate_update"),
      pollPda.toBuffer(),
      wallet.publicKey.toBuffer(),
      new BN(0).toArrayLike(Buffer, "le", 8),
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

  let [mintPda, _mintBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("poeken_mint")],
    program.programId
  );

  const forecasterTokenAccountAddress = await getAssociatedTokenAddress(
    mintPda,
    wallet.publicKey
  );

  let [escrowPda, _escrowBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow")],
    program.programId
  );

  const makeEstimateInstruction = await program.methods
    .makeEstimate(
      lowerEstimate !== undefined ? lowerEstimate : 0,
      upperEstimate !== undefined ? upperEstimate : 0
    )
    .accountsPartial({
      user: userPda,
      poll: pollPda,
      userEstimate: userEstimatePda,
      // userEstimateUpdate: userEstimateUpdatePda,
      pollEstimateUpdate: estimateUpdatePda,
      scoringList: scoreListPda,
      userScore: userScorePda,
      forecasterTokenAccount: forecasterTokenAccountAddress,
      mint: mintPda,
      escrowAccount: escrowPda,
    })
    .instruction();

  let instructions: TransactionInstruction[] = [];
  if (userAccount === null) {
    const registerUserInstruction = await program.methods
      .registerUser()
      .accountsPartial({
        user: userPda,
        mint: mintPda,
        tokenAccount: forecasterTokenAccountAddress,
      })
      .instruction();
    instructions = [registerUserInstruction, makeEstimateInstruction];
  } else {
    instructions = [makeEstimateInstruction];
  }

  await sendVersionedTransaction(instructions, wallet, connection);
};

const useMakeEstimate = (
  program: Program<Poe>,
  connection: Connection,
  wallet: WalletContextState
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: registerUser } = useRegisterUser(program, connection, wallet);
  const { setVisible } = useWalletModal();

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
      makeEstimate(
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
        description: "Estimate is submitted.",
      });
      queryClient.invalidateQueries({
        queryKey: [pollByIdKey, variables.pollId],
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
      queryClient.invalidateQueries({
        queryKey: [
          userAccountKey,
          connection.rpcEndpoint,
          wallet.publicKey?.toBase58() || "",
        ],
      });
    },
    onError: (e) => {
      if (e instanceof NoUserAccountError) {
        toast({
          variant: "destructive",
          title: e.name,
          description: (
            <div className="flex gap-2 items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/avatar.png" alt="@shadcn" />
                <AvatarFallback>Av</AvatarFallback>
              </Avatar>
              <div>Please create a user account first.</div>
            </div>
          ),
          action: (
            <ToastAction
              altText="Create User Account"
              onClick={() => registerUser()}
            >
              Create Account
            </ToastAction>
          ),
          duration: 8000,
        });
      } else if (e instanceof WalletNotConnectedError) {
        toast({
          variant: "destructive",
          title: e.name,
          description: e.message,
          action: (
            <ToastAction
              altText="Connect wallet"
              onClick={() => setVisible(true)}
            >
              Connect Wallet
            </ToastAction>
          ),
          duration: 8000,
        });
      } else {
        toast({
          variant: "destructive",
          title: e.name,
          description: e.message,
        });
      }
    },
  });
};

export { useMakeEstimate };
