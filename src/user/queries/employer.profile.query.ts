import { IsNotEmpty } from 'class-validator';

export class EmployerProfileQuery {
  @IsNotEmpty()
  public readonly uuid: string;
}
