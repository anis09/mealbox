import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dessert {
  @Field()
  uuid: string;

  @Field()
  public readonly name: string;

  @Field()
  public readonly description: string;

  @Field()
  public readonly price: string;

  @Field()
  public readonly category: string;

  @Field()
  public readonly image: string;
}
