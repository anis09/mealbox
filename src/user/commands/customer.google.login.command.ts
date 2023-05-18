import { IsNotEmpty } from 'class-validator';

export class CustomerGoogleLoginCommand {
  @IsNotEmpty()
  public readonly tokenId: string;
}
