import { IsNotEmpty } from 'class-validator';

export class DessertDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
