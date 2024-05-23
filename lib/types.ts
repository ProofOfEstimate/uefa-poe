import { PublicKey } from "@solana/web3.js";

export type Poll = {
  creator: PublicKey;
  resolver: PublicKey;
  open: boolean;
  id: number;
  category: number;
  startSlot: number;
  endSlot: number;
  endTime: number | null;
  collectiveEstimate: number | null;
  lnGmA: number | null;
  lnGmB: number | null;
  numForecasters: number;
  numEstimateUpdates: number;
  accumulatedWeights: number;
  result: boolean | null;
  question: string;
  description: string;
  bump: number;
};
