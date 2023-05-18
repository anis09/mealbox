import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Phone } from '../../common';

class EntrepriseSendAddRequestCommandRequestedByInput {
  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @ValidateNested()
  @Type(() => Phone)
  public readonly phone: Phone;

  @IsEmail()
  public readonly email: string;

  @IsBoolean()
  public readonly notify: boolean;
}

class EntrepriseSendAddRequestCommandAddressInput {
  @IsString()
  public readonly street: string;

  @IsString()
  public readonly additional: string;

  @IsNotEmpty()
  public readonly zipCode: number;

  @IsString()
  public readonly city: string;

  @IsString()
  public readonly country: string;
}

export class EntrepriseSendAddRequestCommand {
  @IsNotEmpty()
  @IsString()
  public readonly socialReason: string;

  @ValidateNested()
  @Type(() => EntrepriseSendAddRequestCommandAddressInput)
  public readonly address: EntrepriseSendAddRequestCommandAddressInput;

  @IsNotEmpty()
  public readonly employeeNumber: string;

  @ValidateNested()
  @Type(() => Phone)
  public readonly phone: Phone;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ValidateNested()
  @Type(() => EntrepriseSendAddRequestCommandRequestedByInput)
  public readonly requestedBy: EntrepriseSendAddRequestCommandRequestedByInput;
}
