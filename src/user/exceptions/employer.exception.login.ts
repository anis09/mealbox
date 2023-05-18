export class EmployerExceptionLogin extends Error {
  constructor() {
    super(`invalid email/phone employer argument`);
  }
}
