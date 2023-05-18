import { IsNotEmpty } from 'class-validator';

export class EmployerLoginCommand {
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
