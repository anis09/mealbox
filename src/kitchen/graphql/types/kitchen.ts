import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class KitchenAddress {
  @Field()
  public readonly city: string;
  @Field()
  public readonly country: string;
  @Field()
  public readonly street: string;
  @Field()
  public readonly zipCode: number;
}
@ObjectType()
class KitchenLocation {
  @Field()
  public readonly latitude: number;
  @Field()
  public readonly longitude: number;
}
@ObjectType()
export class Kitchen {
  @Field()
  public readonly uuid: string;
  @Field()
  public readonly name: string;
  @Field()
  public readonly location: KitchenLocation;
  @Field()
  public readonly status: boolean;
  @Field()
  public readonly address: KitchenAddress;
}
