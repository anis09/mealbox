import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerGoogleLoginInput {
  @Field()
  tokenId: string;
}
