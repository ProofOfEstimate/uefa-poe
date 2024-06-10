import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Poe } from "@/idl/poe";

const userAccountKey = "userAccount";

const getUserAccount = async (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null
) => {
  if (publicKey) {
    let [userPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), publicKey.toBuffer()],
      program.programId
    );

    const userAccount = await connection.getAccountInfo(userPda);
    if (userAccount) {
      return await program.account.user.fetch(userPda);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const useUserAccount = (
  program: Program<Poe>,
  connection: Connection,
  publicKey: PublicKey | null
) => {
  return useQuery({
    queryKey: [
      userAccountKey,
      connection.rpcEndpoint,
      publicKey?.toBase58() || "",
    ],
    queryFn: async () => await getUserAccount(program, connection, publicKey),
    staleTime: Infinity,
    enabled: !!program,
  });
};

export { useUserAccount, getUserAccount, userAccountKey };
