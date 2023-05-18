import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field()
  uuid: string;
  @Field()
  public readonly firstName: string;
  @Field()
  public readonly lastName: string;
  @Field()
  public readonly email: string;
  @Field()
  public readonly password: string;
  @Field()
  public readonly entreprise: string;
  @Field()
  public readonly phone: string;
}
