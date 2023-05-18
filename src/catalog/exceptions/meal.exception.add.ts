export class InvalidArgumentMealAddCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments meal add command`);
  }
}
