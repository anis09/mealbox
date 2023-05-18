export class InvalidArgumentDessertAddCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments dessert add command`);
  }
}
