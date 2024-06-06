import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const QuickTourDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild>
          <div>Quick Tour</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Carousel className="mx-8">
          <CarouselContent>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <div className="text-lg md:text-xl font-bold">
                  Predict Probabilities, not just outcomes!
                </div>
                <div>
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
                <div>
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
                <div>If you are right, you make a profit in expectation.</div>
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
