import { IsNotEmpty } from 'class-validator';

export class CustomerLoginCommand {
  @IsNotEmpty()
  public readonly emailOrPhone: string;

  @IsNotEmpty()
  public readonly password: string;
}
