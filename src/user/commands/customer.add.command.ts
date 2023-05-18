import { IsNotEmpty, IsEmail, ValidateNested } from 'class-validator';
import { Phone } from '../../common';
import { Type } from 'class-transformer';

export class CustomerAddCommand {
  @IsNotEmpty()
  public readonly firstName: string;

  @IsNotEmpty()
  public readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;

  @IsNotEmpty()
  public readonly entreprise: string;

  @ValidateNested()
  @Type(() => Phone)
  public readonly phone: Phone;
}
