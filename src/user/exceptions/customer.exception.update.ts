export class CustomerExceptionUpdate extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid update customer argument`);
  }
}
