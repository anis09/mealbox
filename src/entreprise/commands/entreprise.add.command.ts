import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Phone } from '../../common';

class EntrepriseAddCommandAddress {
  @IsString()
  public readonly street: string;

  @IsString()
  public readonly additional: string;

  @IsNumber()
  public readonly zipCode: number;

  @IsString()
  public readonly city: string;

  @IsString()
  public readonly country: string;
}

class EntrepriseAddCommandLocation {
  @IsLatitude()
  public readonly latitude: number;

  @IsLongitude()
  public readonly longitude: number;
}

export class EntrepriseAddCommand {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ValidateNested()
  @Type(() => Phone)
  public readonly phone: Phone;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  public readonly address: EntrepriseAddCommandAddress;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  public readonly location: EntrepriseAddCommandLocation;

  @IsNotEmpty()
  @IsBoolean()
  public readonly activate: boolean;
}
