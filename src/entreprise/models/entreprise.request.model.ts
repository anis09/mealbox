import parsePhoneNumber, { CountryCode } from 'libphonenumber-js';
import { AddressInterface, PhoneInterface } from '../../common/object-values';

type EntrepriseSendAddRequestPhoneInput = PhoneInterface;
type EntrepriseSendAddRequestRequestedByPhoneInput = PhoneInterface;
type EntrepriseSendAddRequestAddressInput = AddressInterface;

interface EntrepriseSendAddRequestRequestedByInput {
  firstName: string;
  lastName: string;
  phone: EntrepriseSendAddRequestRequestedByPhoneInput;
  email: string;
  notify: boolean;
}

export interface EntrepriseSendAddRequestInput {
  socialReason: string;

  address: EntrepriseSendAddRequestAddressInput;
  employeeNumber: string;
  email: string;
  phone: EntrepriseSendAddRequestPhoneInput;
  requestedBy: EntrepriseSendAddRequestRequestedByInput;
}

export class EntrepriseAddRequestRequestedByModel {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notify: boolean;
}

export class EntrepriseAddRequestModel {
  private socialReason: string;
  private phone: string;
  private email: string;
  private address: EntrepriseSendAddRequestAddressInput;
  private employeeNumber: string;
  private requestedBy: EntrepriseAddRequestRequestedByModel;

  constructor(public readonly uuid: string) {}

  create(input: EntrepriseSendAddRequestInput) {
    this.socialReason = input.socialReason;

    this.address = input.address;

    this.phone = EntrepriseAddRequestModel.formatPhoneNumber(input.phone);

    this.employeeNumber = input.employeeNumber;

    this.email = input.email;

    this.requestedBy = {
      ...input.requestedBy,
      phone: EntrepriseAddRequestModel.formatPhoneNumber(
        input.requestedBy.phone,
      ),
    };

    return this;
  }

  private static formatPhoneNumber(phone: PhoneInterface) {
    return parsePhoneNumber(phone.number, {
      defaultCountry: phone.country as CountryCode,
    }).number as string;
  }
}
