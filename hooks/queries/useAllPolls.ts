import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Program } from "@coral-xyz/anchor";
import { Poll } from "@/lib/types";
import { Poe } from "@/idl/poe";

const allPollsKey = "allPolls";

const getAllPolls = async (program: Program<Poe>) => {
  const polls = await program.account.poll.all();

  return polls
    .filter(
      (poll) =>
        poll.account.creator.toBase58() ===
        "3aSqvNz5XuBkudHZLZZSfio3Hd6nxEEzUWSwvggWWDR1"
    )
    .map((poll) => poll.account) as unknown as Poll[];
};

const useAllPolls = (program: Program<Poe>) => {
  return useQuery({
    queryKey: [allPollsKey],
    queryFn: async () => await getAllPolls(program),
    enabled: !!program,
    placeholderData: keepPreviousData,
  });
};

export { useAllPolls, allPollsKey };
