export class InvalidArgumentEntrepriseUpdateCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments entreprise update command`);
  }
}
