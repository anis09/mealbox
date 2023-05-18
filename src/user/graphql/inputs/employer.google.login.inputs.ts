import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployerGoogleLoginInput {
  @Field()
  tokenId: string;
}
