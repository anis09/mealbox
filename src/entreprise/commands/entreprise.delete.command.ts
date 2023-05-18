import { IsNotEmpty } from 'class-validator';

export class EntrepriseDeleteCommand {
  @IsNotEmpty()
  public readonly uuid: string;
}
