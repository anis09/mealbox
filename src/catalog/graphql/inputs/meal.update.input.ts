import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MealUpdateInput {
  @Field()
  public readonly uuid: string;

  @Field({ nullable: true })
  public readonly name?: string;

  @Field({ nullable: true })
  public readonly description?: string;

  @Field({ nullable: true })
  public readonly price?: number;

  @Field({ nullable: true })
  public readonly category?: string;

  @Field({ nullable: true })
  public readonly image?: string;
}
