export class DessertExceptionDelete extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid delete customer argument`);
  }
}
