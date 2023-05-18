import { IsNotEmpty } from 'class-validator';

export class KitchenDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
