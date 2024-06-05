export class NoUserAccountError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "No User Account!";
  }
}
