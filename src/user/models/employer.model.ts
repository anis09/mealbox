import { PasswordHasher } from '../../common';

export interface EmployerRegisterInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;
}

export class EmployerModel {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  updateAt: Date;

  constructor(public readonly uuid: string) {}

  register(input: EmployerRegisterInput) {
    this.firstName = input.firstName;

    this.lastName = input.lastName;

    this.email = input.email;

    this.password = input.password;

    return this;
  }

  async hashPassword(passwordHasher: PasswordHasher): Promise<void> {
    if (passwordHasher.needHash(this.password)) {
      this.password = await passwordHasher.hash(this.password, this.uuid);
    }
  }

  verifyPassword(passwordHasher: PasswordHasher, plain: string) {
    return passwordHasher.verify(this.password, plain, this.uuid);
  }
}
