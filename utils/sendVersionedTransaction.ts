import { WalletNotConnectedError } from "@/errors/WalletNotConnectedError";
import { connectWalletText } from "@/texts/toastTitles";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  TransactionInstruction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";

export const sendVersionedTransaction = async (
  instructions: TransactionInstruction[],
  wallet: WalletContextState,
  connection: Connection
) => {
  if (!wallet.publicKey) {
    throw new WalletNotConnectedError(connectWalletText);
  }

  // Get the lates block hash to use on our transaction and confirmation
  let latestBlockhash = await connection.getLatestBlockhash("confirmed");

  // Create a new TransactionMessage with version and compile it to version 0
  const messageV0 = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToV0Message();

  // Create a new VersionedTransacction to support the v0 message
  const transaction = new VersionedTransaction(messageV0);

  // Send transaction and await for signature
  let signature: TransactionSignature = await wallet.sendTransaction(
    transaction,
    connection,
    { skipPreflight: true }
  );

  console.log("Signature", signature);

  // Await for confirmation
  return await connection.confirmTransaction(
    { signature, ...latestBlockhash },
    "confirmed"
  );
};
