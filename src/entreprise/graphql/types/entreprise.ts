import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class EntrepriseAddress {
  @Field()
  public readonly street: string;

  @Field({ nullable: true })
  public readonly additional?: string;

  @Field()
  public readonly zipCode: number;

  @Field()
  public readonly city: string;

  @Field()
  public readonly country: string;
}

@ObjectType()
class EntrepriseLocation {
  @Field()
  public readonly latitude: number;

  @Field()
  public readonly longitude: number;
}

@ObjectType()
export class Entreprise {
  @Field()
  public readonly uuid: string;

  @Field()
  public readonly name: string;

  @Field()
  public readonly email: string;

  @Field()
  public readonly phone: string;

  @Field()
  public readonly address: EntrepriseAddress;

  @Field()
  public readonly location: EntrepriseLocation;
}
