import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddressInput {
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
