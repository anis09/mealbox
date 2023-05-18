export class InvalidArgumentEntrepriseSendAddRequestCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments entreprise form add command`);
  }
}
