import { useEffect, useState } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Poe } from "@/idl/poe";
import idlFile from "@/idl/poe.json";
import { Keypair } from "@solana/web3.js";

export default function useAnchorProgram(): Program<Poe> {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<Poe> | null>(null);

  const idl = idlFile as Idl;

  useEffect(() => {
    let provider;
    if (wallet) {
      provider = new AnchorProvider(connection, wallet);
    } else {
      provider = new AnchorProvider(connection, {
        publicKey: Keypair.generate().publicKey,
        signAllTransactions: async (txes) => txes,
        signTransaction: async (tx) => tx,
      });
    }

    const program = new Program(idl, provider) as unknown as Program<Poe>;
    setProgram(program);
  }, [wallet, connection, idl]);

  return program as Program<Poe>;
}
