import { IsNotEmpty } from 'class-validator';

export class GroceryDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
