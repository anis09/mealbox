import { IsNotEmpty } from 'class-validator';

export class CustomerDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
