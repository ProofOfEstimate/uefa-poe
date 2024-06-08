import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BN, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Poe } from "@/idl/poe";

type EstimateData = {
  name: Date;
  estimate: number | null;
  confidenceInterval: number[] | null;
};

const estimateUpdatesByPollKey = "estimateUpdatesByPoll";

const getEstimateUpdatesByPoll = async (
  program: Program<Poe>,
  pollId: number,
  publicKey: PublicKey | null
) => {
  const [pollPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 8)],
    program.programId
  );
  const pollAccount = await program.account.poll.fetch(pollPda);

  const estimateUpdates = await program.account.pollEstimateUpdate.all([
    {
      memcmp: {
        offset: 8, // discriminator
        bytes: pollPda.toBase58(),
      },
    },
  ]);

  estimateUpdates.sort(
    (a, b) => a.account.timestamp.toNumber() - b.account.timestamp.toNumber()
  );

  const updateData = estimateUpdates.map((update) => {
    const timestamp = update.account.timestamp.toNumber();

    return {
      timestamp: timestamp,
      estimate: update.account.estimate,
      deviation:
        update.account.variance !== null && update.account.variance >= 0
          ? Math.sqrt(update.account.variance / 2)
          : null,
    };
  });

  updateData.sort((a, b) => a.timestamp - b.timestamp);

  let estimates = [];
  let today = new Date().getTime();

  let lastDisplayTime =
    pollAccount.result === null
      ? today / 1000
      : updateData[updateData.length - 1].timestamp;

  for (let i = 0; i < updateData.length - 1; i++) {
    const time = updateData[i].timestamp;
    const estimate = updateData[i].estimate;
    const deviation = updateData[i].deviation;

    const nextTime = updateData[i + 1].timestamp;
    // Fill with data between updates, not necessary but a smoother experience
    for (let j = 0; j < nextTime - time; j = j + 60000000000000) {
      estimates.push({
        name: time + j,
        estimate: estimate !== null ? estimate / 10000 : null,
        confidenceInterval:
          deviation !== null && estimate !== null
            ? [estimate / 10000 - deviation, estimate / 10000 + deviation]
            : null,
      } as unknown as EstimateData);
    }
    estimates.push({
      name: nextTime,
      estimate: estimate !== null ? estimate / 10000 : null,
      confidenceInterval:
        deviation !== null && estimate !== null
          ? [estimate / 10000 - deviation, estimate / 10000 + deviation]
          : null,
    } as unknown as EstimateData);
  }
  const lastTimestamp = updateData[updateData.length - 1].timestamp;
  const lastEstimate = updateData[updateData.length - 1].estimate;
  const lastDeviation = updateData[updateData.length - 1].deviation;
  for (let k = 0; k < lastDisplayTime - lastTimestamp; k = k + 1000000000) {
    estimates.push({
      name: lastTimestamp + k,
      estimate: lastEstimate !== null ? lastEstimate / 10000 : null,
      confidenceInterval:
        lastDeviation !== null && lastEstimate !== null
          ? [
              lastEstimate / 10000 - lastDeviation,
              lastEstimate / 10000 + lastDeviation,
            ]
          : null,
    } as unknown as EstimateData);
  }
  estimates.push({
    name: lastDisplayTime,
    estimate: lastEstimate !== null ? lastEstimate / 10000 : null,
    confidenceInterval:
      lastDeviation !== null && lastEstimate !== null
        ? [
            lastEstimate / 10000 - lastDeviation,
            lastEstimate / 10000 + lastDeviation,
          ]
        : null,
  } as unknown as EstimateData);

  return estimates;
};

const useEstimateUpdatesByPoll = (
  program: Program<Poe>,
  pollId: number,
  publicKey: PublicKey | null
) => {
  return useQuery({
    queryKey: [estimateUpdatesByPollKey, pollId],
    queryFn: async () =>
      await getEstimateUpdatesByPoll(program, pollId, publicKey),
    enabled: !!program,
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
  });
};

export {
  useEstimateUpdatesByPoll,
  getEstimateUpdatesByPoll,
  estimateUpdatesByPollKey,
};
