import { PublicKey } from "@solana/web3.js";

export type Poll = {
  creator: PublicKey;
  resolver: PublicKey;
  open: boolean;
  id: number;
  category: number;
  hasStarted: boolean;
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

export type UserAccount = {
  userAddress: PublicKey;
  score: number;
  correctAnswerCount: number;
  participationCount: number;
  bump: number;
};
