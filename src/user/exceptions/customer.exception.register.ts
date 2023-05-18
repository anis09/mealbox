export class CustomerExceptionRegister extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid register customer argument`);
  }
}
