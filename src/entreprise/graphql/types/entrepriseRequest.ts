import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class EntrepriseRequestAddress {
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
export class RequestedBy {
  @Field()
  public readonly firstName: string;
  @Field()
  public readonly lastName: string;
  @Field()
  public readonly phone: string;
  @Field()
  public readonly email: string;
  @Field()
  public readonly notify: boolean;
}

@ObjectType()
export class EntrepriseRequest {
  @Field()
  public readonly uuid: string;

  @Field()
  public readonly socialReason: string;

  @Field()
  public readonly email: string;

  @Field()
  public readonly employeeNumber: string;

  @Field()
  public readonly address: EntrepriseRequestAddress;
  @Field()
  public readonly requestedBy: RequestedBy;
}
