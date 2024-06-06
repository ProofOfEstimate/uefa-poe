import ConnectWalletButton from "./connect-wallet-button";
require("@solana/wallet-adapter-react-ui/styles.css");

export const NavBar = () => {
  return (
    <header>
      <div className="border-b px-4">
        <div className="flex h-16 items-center gap-8">
          {/* Keep it as comment because I think it will be used soon */}
          {/* <MainNav /> */}
          {/* <MobileNav /> */}
          <div className="ml-auto flex items-center space-x-4">
            <ConnectWalletButton />
          </div>
          {/* <DarkModeToggle /> */}
        </div>
      </div>
    </header>
  );
};
