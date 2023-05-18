import { IsNotEmpty, IsOptional } from 'class-validator';

export class MealUpdateCommand {
  @IsNotEmpty()
  public readonly uuid: string;

  @IsNotEmpty()
  @IsOptional()
  public readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  public readonly description: string;

  @IsNotEmpty()
  @IsOptional()
  public readonly price: number;

  @IsNotEmpty()
  @IsOptional()
  public readonly category: string;

  @IsNotEmpty()
  @IsOptional()
  public readonly image: string;
}
