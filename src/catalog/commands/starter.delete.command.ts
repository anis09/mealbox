import { IsNotEmpty } from 'class-validator';

export class StarterDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
