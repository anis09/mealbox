import { IsNotEmpty } from 'class-validator';

export class EmployerGoogleLoginCommand {
  @IsNotEmpty()
  public readonly tokenId: string;
}
