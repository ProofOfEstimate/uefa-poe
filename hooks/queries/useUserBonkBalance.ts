import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const userBonkBalanceKey = "userBonkBalance";

const getUserBalance = async (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null
) => {
  let [mintPda, _mintBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("poeken_mint")],
    program.programId
  );

  if (publicKey) {
    const tokenAccount = await getAssociatedTokenAddress(mintPda, publicKey);
    const info = await connection.getTokenAccountBalance(tokenAccount);

    return info.value.uiAmount;
  } else {
    return 0;
  }
};

const useUserBonkBalance = (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null
) => {
  return useQuery({
    queryKey: [
      userBonkBalanceKey,
      connection.rpcEndpoint,
      publicKey?.toBase58() || "",
    ],
    queryFn: async () => await getUserBalance(program, connection, publicKey),
    initialDataUpdatedAt: Date.now(),
  });
};

export { useUserBonkBalance, getUserBalance, userBonkBalanceKey };
