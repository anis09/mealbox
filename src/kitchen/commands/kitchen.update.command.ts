import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class KitchenUpdateCommandAddress {
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

class KitchenUpdateCommandLocation {
  @IsLatitude()
  public readonly latitude: number;

  @IsLongitude()
  public readonly longitude: number;
}

export class KitchenUpdateCommand {
  @IsNotEmpty()
  public readonly uuid: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  public readonly name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  public readonly location: KitchenUpdateCommandLocation;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  public readonly status: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  public readonly address: KitchenUpdateCommandAddress;
}
