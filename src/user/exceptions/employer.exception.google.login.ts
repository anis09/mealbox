export class EmployerExceptionGoogleLogin extends Error {
  constructor() {
    super(`No account attached to the email`);
  }
}
