import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployerLoginInput {
  @Field()
  public readonly email: string;

  @Field()
  public readonly password: string;
}
