export class WalletNotConnectedError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "Wallet not connected!";
  }
}
