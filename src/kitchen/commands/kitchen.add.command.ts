import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class KitchenAddCommandAddress {
  @IsNotEmpty()
  @IsString()
  public readonly city: string;

  @IsNotEmpty()
  @IsString()
  public readonly country: string;

  @IsNotEmpty()
  @IsString()
  public readonly street: string;

  @IsNotEmpty()
  @IsNumber()
  public readonly zipCode: number;
}

class KitchenAddCommandLocation {
  @IsLatitude()
  public readonly latitude: number;

  @IsLongitude()
  public readonly longitude: number;
}

export class KitchenAddCommand {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  public readonly name: string;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  public readonly location: KitchenAddCommandLocation;

  @IsNotEmpty()
  @IsBoolean()
  public readonly status: boolean;

  @ValidateNested({ each: true })
  public readonly address: KitchenAddCommandAddress;
}
