import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const userSolBalanceKey = "userSolBalance";

const getUserBalance = async (
  connection: Connection,
  publicKey: PublicKey | null
) => {
  if (publicKey) {
    const balance = await connection.getBalance(publicKey, "confirmed");
    return balance / LAMPORTS_PER_SOL;
  } else {
    return 0;
  }
};

const useUserSolBalance = (
  connection: Connection,
  publicKey: PublicKey | null
) => {
  return useQuery({
    queryKey: [
      userSolBalanceKey,
      connection.rpcEndpoint,
      publicKey?.toBase58() || "",
    ],
    queryFn: async () => await getUserBalance(connection, publicKey),
    initialDataUpdatedAt: Date.now(),
  });
};

export { useUserSolBalance, getUserBalance, userSolBalanceKey };
