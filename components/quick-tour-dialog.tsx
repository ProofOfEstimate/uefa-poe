"use client";

import useAnchorProgram from "@/hooks/useAnchorProgram";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useUserAccount } from "@/hooks/queries/useUserAccount";
import { useRegisterUser } from "@/hooks/mutations/useRegisterUser";

const QuickTourDialog = () => {
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const wallet = useWallet();
  const { data: userAccount, isLoading: isScoreLoading } = useUserAccount(
    program,
    connection,
    wallet.publicKey
  );

  const { mutate: registerUser } = useRegisterUser(program, connection, wallet);

  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild>
          <div>Quick Tour</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <div className="text-lg md:text-xl font-bold">
                  Predict Probabilities, not just outcomes!
                </div>
                <div className="w-5/6 sm:w-full">
                  With Poe, you predict how likely something is to happen. Your
                  betting stake goes into a pool. Poe uses a special system to
                  score your forecast and determine your payout.
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <div className="text-lg md:text-xl font-bold">
                  Always in the Game!
                </div>
                <div className="w-5/6 sm:w-full">
                  Update your beliefs as you learn more and the match
                  progresses. Poe will calculate a time-averaged score after the
                  end of the match which determines your payout.
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <div className="text-lg md:text-xl font-bold">
                  Get rewarded for your insights!
                </div>
                <div className="w-5/6 sm:w-full">
                  Just submit your beliefs. If you are right, you make a profit
                  in expectation. Mint your 4000 BONK token to get started!
                </div>
                {userAccount === null && !isScoreLoading ? (
                  <Button className="w-1/2" onClick={() => registerUser()}>
                    Mint BONK
                  </Button>
                ) : (
                  <Button className="w-1/2" disabled>
                    Bonk already minted!
                  </Button>
                )}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default QuickTourDialog;
