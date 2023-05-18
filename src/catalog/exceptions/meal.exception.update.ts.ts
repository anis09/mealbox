export class InvalidArgumentMealUpdateCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments meal update command`);
  }
}
