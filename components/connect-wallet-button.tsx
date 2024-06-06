"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { toast } from "./ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import useAnchorProgram from "@/hooks/useAnchorProgram";
import { useAllPollsByUser } from "@/hooks/queries/useAllPollsByUser";
import { Skeleton } from "./ui/skeleton";
import { useUserAccount } from "@/hooks/queries/useUserAccount";
import { useUserSolBalance } from "@/hooks/queries/useUserSolBalance";
import { FaWallet } from "react-icons/fa";

const ConnectWalletButton = () => {
  const wallet = useAnchorWallet();
  const { disconnect, connected, publicKey } = useWallet();
  const program = useAnchorProgram();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();

  const { data: userScore, isLoading: isScoreLoading } = useUserAccount(
    program,
    connection,
    publicKey
  );

  const { data: userPolls } = useAllPollsByUser(program, publicKey);
  const { data: solBalance, isLoading: isSolBalanceLoading } =
    useUserSolBalance(connection, wallet?.publicKey ?? null);

  if (!connected) {
    return (
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="flex gap-2 items-center">
          <FaWallet />
          <div className="hidden sm:block">Connect wallet</div>
        </div>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <div className="flex gap-2 items-center">
            <FaWallet className="sm:hidden" />
            <div className="hidden sm:block">Connected</div>
          </div>
          <RiArrowDropDownLine className="text-xl ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="font-normal">
          {wallet && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="flex"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        wallet.publicKey?.toBase58() ?? ""
                      );
                      toast({ variant: "default", title: "Copied!" });
                    }}
                  >
                    <div>
                      {wallet.publicKey.toBase58().slice(0, 4) +
                        "..." +
                        wallet.publicKey.toBase58().slice(-4)}
                    </div>
                    <TbCopy className="ml-2" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <div>{wallet.publicKey.toBase58()}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="border rounded-md py-2 px-1 my-2">
            <div className="flex flex-col mx-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                Score:{" "}
                {!isScoreLoading ? (
                  userScore ? (
                    userScore.score.toFixed(2)
                  ) : (
                    100.0
                  )
                ) : (
                  <Skeleton className="w-6 h-4 rounded-md" />
                )}
              </div>
              <div className="flex items-center gap-2">
                Sol Balance:{" "}
                {!isSolBalanceLoading ? (
                  solBalance?.toFixed(2)
                ) : (
                  <Skeleton className="w-6 h-4 rounded-md" />
                )}
              </div>
            </div>
          </div>
        </DropdownMenuGroup>
        {wallet && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={disconnect}
              className="hover:cursor-pointer"
            >
              Disconnect
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectWalletButton;
