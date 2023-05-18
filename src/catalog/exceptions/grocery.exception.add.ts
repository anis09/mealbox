export class InvalidArgumentGroceryAddCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments grocery add command`);
  }
}
