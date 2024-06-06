import Link from "next/link";
import ConnectWalletButton from "./connect-wallet-button";
import Image from "next/image";
import QuickTourDialog from "./quick-tour-dialog";
require("@solana/wallet-adapter-react-ui/styles.css");

export const NavBar = () => {
  return (
    <header>
      <div className="border-b px-4 py-4">
        <div className="flex h-16 items-center gap-1 sm:gap-8">
          {/* Keep it as comment because I think it will be used soon */}
          {/* <MainNav /> */}
          {/* <MobileNav /> */}

          <Link
            href="/"
            className="text-sm font-medium hover:cursor-pointer"
            prefetch={false}
          >
            <p className="text-lg">UEFA 2024</p>
            <span className="sm:flex hidden items-center gap-1 text-xs">
              powered by
              <Image width={20} height={20} alt="Logo" src={"/Poe.png"} />
            </span>
          </Link>
          <Link
            href="/leaderboard"
            className="ml-auto text-sm font-medium hover:bg-yellow-500 p-2 hover:bg-opacity-20 rounded-md"
            prefetch={false}
          >
            Leaderboard
          </Link>
          <div className="flex items-center md:space-x-4">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};
