import parsePhoneNumber, { CountryCode } from 'libphonenumber-js';
import { PasswordHasher } from '../../common';

export interface CustomerPhoneInput {
  country: string;

  number: string;
}

export interface CustomerUpdateInput {
  firstName?: string;

  lastName?: string;

  email?: string;

  password?: string;

  entreprise?: string;

  phone?: CustomerPhoneInput;
}

export interface CustomerAddInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  entreprise?: string;

  phone: CustomerPhoneInput;
}

export interface CustomerRegisterInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  phone: CustomerPhoneInput;
}

export class CustomerModel {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  phone: string;

  entreprise?: string;

  updateAt: Date;

  constructor(public readonly uuid: string) {}

  add(input: CustomerAddInput) {
    this.firstName = input.firstName;

    this.lastName = input.lastName;

    this.email = input.email;

    this.password = input.password;

    this.entreprise = input.entreprise;

    this.phone = CustomerModel.formatPhoneNumber(input.phone);

    return this;
  }

  register(input: CustomerRegisterInput) {
    this.firstName = input.firstName;

    this.lastName = input.lastName;

    this.email = input.email;

    this.password = input.password;

    this.phone = CustomerModel.formatPhoneNumber(input.phone);

    return this;
  }

  update(input: CustomerUpdateInput) {
    let hasChanges = false;

    if (
      input.hasOwnProperty('firstName') &&
      this.firstName !== input.firstName
    ) {
      this.firstName = input.firstName;
      hasChanges = true;
    }

    if (input.hasOwnProperty('lastName') && this.lastName !== input.lastName) {
      this.lastName = input.lastName;
      hasChanges = true;
    }

    if (input.hasOwnProperty('email') && this.email !== input.email) {
      this.email = input.email;
      hasChanges = true;
    }

    if (input.hasOwnProperty('password') && this.password !== input.password) {
      this.password = input.password;
      hasChanges = true;
    }

    if (input.hasOwnProperty('phone')) {
      const formattedPhoneNumber = CustomerModel.formatPhoneNumber(input.phone);

      if (this.phone !== formattedPhoneNumber) {
        this.phone = formattedPhoneNumber;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      this.updateAt = new Date();
    }
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

  private static formatPhoneNumber(phone: CustomerPhoneInput) {
    return parsePhoneNumber(phone.number, {
      defaultCountry: phone.country as CountryCode,
    }).number as string;
  }
}
