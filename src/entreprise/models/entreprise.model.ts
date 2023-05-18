import parsePhoneNumber, { CountryCode } from 'libphonenumber-js';

export interface EntreprisePhoneInput {
  country: string;

  number: string;
}

export interface EntrepriseUpdateInput {
  name?: string;

  email?: string;

  phone?: EntreprisePhoneInput;

  address?: {
    street: string;

    additional: string;

    zipCode: number;

    city: string;

    country: string;
  };

  location?: {
    latitude: number;

    longitude: number;
  };

  activate?: boolean;
}

export interface EntrepriseAddInput {
  name: string;

  email: string;

  phone: EntreprisePhoneInput;

  address: {
    street: string;

    additional: string;

    zipCode: number;

    city: string;

    country: string;
  };

  location: {
    latitude: number;

    longitude: number;
  };

  activate: boolean;
}

export class EntrepriseModel {
  public name: string;

  private email: string;

  private phone: string;

  private address: {
    street: string;

    additional: string;

    zipCode: number;

    city: string;

    country: string;
  };

  private location: {
    latitude: number;

    longitude: number;
  };

  private activate: boolean;

  private updateAt: Date;

  constructor(public readonly uuid: string) {}

  add(input: EntrepriseAddInput) {
    this.name = input.name;

    this.email = input.email;

    this.phone = EntrepriseModel.formatPhoneNumber(input.phone);

    this.address = input.address;

    this.location = input.location;

    this.activate = input.activate;

    return this;
  }

  update(input: EntrepriseUpdateInput) {
    let hasChanges = false;

    if (input.hasOwnProperty('name') && this.name !== input.name) {
      this.name = input.name;
      hasChanges = true;
    }

    if (input.hasOwnProperty('phone')) {
      const formattedPhoneNumber = EntrepriseModel.formatPhoneNumber(
        input.phone,
      );

      if (this.phone !== formattedPhoneNumber) {
        this.phone = formattedPhoneNumber;
        hasChanges = true;
      }
    }

    if (input.hasOwnProperty('email') && this.email !== input.email) {
      this.email = input.email;
      hasChanges = true;
    }

    if (input.hasOwnProperty('address') && this.address !== input.address) {
      this.address = input.address;
      hasChanges = true;
    }

    if (input.hasOwnProperty('location') && this.location !== input.location) {
      this.location = input.location;
      hasChanges = true;
    }

    if (input.hasOwnProperty('activate') && this.activate !== input.activate) {
      this.activate = input.activate;
      hasChanges = true;
    }

    if (hasChanges) {
      this.updateAt = new Date();
    }

    return this;
  }

  private static formatPhoneNumber(phone: EntreprisePhoneInput) {
    return parsePhoneNumber(phone.number, {
      defaultCountry: phone.country as CountryCode,
    }).number as string;
  }
}
