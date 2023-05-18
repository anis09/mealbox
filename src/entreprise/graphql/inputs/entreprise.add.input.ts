import { Field, InputType } from '@nestjs/graphql';

@InputType()
class EntrepriseAddPhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}

@InputType()
class EntrepriseAddAddressInput {
  @Field()
  public readonly street: string;

  @Field()
  public readonly additional: string;

  @Field()
  public readonly zipCode: number;

  @Field()
  public readonly city: string;

  @Field()
  public readonly country: string;
}

@InputType()
class EntrepriseAddLocationInput {
  @Field()
  public readonly latitude: number;

  @Field()
  public readonly longitude: number;
}

@InputType()
export class EntrepriseAddInput {
  @Field()
  public readonly name: string;

  @Field()
  public readonly email: string;

  @Field()
  public readonly phone: EntrepriseAddPhoneInput;

  @Field()
  public readonly address: EntrepriseAddAddressInput;

  @Field()
  public readonly location: EntrepriseAddLocationInput;

  @Field()
  public readonly activate: boolean;
}
