export class InvalidArgumentEntrepriseAddCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments entreprise add command`);
  }
}
