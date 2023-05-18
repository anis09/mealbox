import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Phone } from '../../common';

class EntrepriseUpdateCommandAddress {
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

class EntrepriseUpdateCommandLocation {
  @IsLatitude()
  public readonly latitude: number;

  @IsLongitude()
  public readonly longitude: number;
}

export class EntrepriseUpdateCommand {
  @IsNotEmpty()
  public readonly uuid: string;

  @IsOptional()
  @IsNotEmpty()
  public readonly name: string;

  @IsOptional()
  @IsEmail()
  public readonly email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Phone)
  public readonly phone: Phone;

  @IsOptional()
  @IsNotEmpty()
  public readonly address: EntrepriseUpdateCommandAddress;

  @IsOptional()
  @IsNotEmpty()
  public readonly location: EntrepriseUpdateCommandLocation;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  public readonly activate: boolean;
}
