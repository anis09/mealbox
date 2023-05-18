import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DessertAddCommand {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  public readonly price: number;

  @IsNotEmpty()
  @IsString()
  public readonly category: string;

  @IsNotEmpty()
  @IsString()
  public readonly image: string;
}
