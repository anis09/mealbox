export class CustomerLoginException extends Error {
  constructor() {
    super(`invalid identifier (email/phone) or password`);
  }
}
