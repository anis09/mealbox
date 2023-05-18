import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Employer {
  @Field()
  public readonly firstName: string;

  @Field()
  public readonly lastName: string;

  @Field()
  public readonly email: string;
}
