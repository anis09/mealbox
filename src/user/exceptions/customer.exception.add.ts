export class CustomerExceptionAdd extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid add customer`);
  }
}
