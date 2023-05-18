export class InvalidArgumentStarterAddCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments starter add command`);
  }
}
