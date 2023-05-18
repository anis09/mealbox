import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Phone } from '../../common';
import { Type } from 'class-transformer';

export class CustomerUpdateCommand {
  @IsNotEmpty()
  public readonly uuid: string;

  @IsOptional()
  @IsNotEmpty()
  public readonly firstName: string;

  @IsOptional()
  @IsNotEmpty()
  public readonly lastName: string;

  @IsOptional()
  @IsEmail()
  public readonly email: string;

  @IsOptional()
  @IsNotEmpty()
  public readonly password: string;

  @IsNotEmpty()
  public readonly entreprise: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Phone)
  public readonly phone: Phone;
}
