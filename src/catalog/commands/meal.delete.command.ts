import { IsNotEmpty } from 'class-validator';

export class MealDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
