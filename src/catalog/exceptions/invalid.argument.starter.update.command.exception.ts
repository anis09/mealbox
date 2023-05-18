export class InvalidArgumentStarterUpdateCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments starter update command`);
  }
}
