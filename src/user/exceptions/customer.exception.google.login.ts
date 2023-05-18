export class CustomerExceptionGoogleLogin extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid google login customer argument`);
  }
}
