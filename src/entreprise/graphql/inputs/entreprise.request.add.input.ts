import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { AddressInput, PhoneInput } from '../../../common/graphql/inputs';

@InputType()
class EntrepriseSendAddRequestAddressInput extends AddressInput {}

@InputType()
class EntrepriseSendAddRequestPhoneInput extends PhoneInput {}

@InputType()
class EntrepriseSendAddRequestRequestedByPhoneInput extends PhoneInput {}

export enum EntrepriseSizeEnum {
  INDIVIDUEL = 'individuel',
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
}

registerEnumType(EntrepriseSizeEnum, { name: 'EntrepriseSizeEnum' });

@InputType()
export class EntrepriseSendAddRequestRequestedByInput {
  @Field()
  public readonly firstName: string;

  @Field()
  public readonly lastName: string;

  @Field()
  public readonly phone: EntrepriseSendAddRequestRequestedByPhoneInput;

  @Field()
  public readonly email: string;

  @Field()
  public readonly notify: boolean;
}

@InputType()
export class EntrepriseSendAddRequestInput {
  @Field()
  public readonly socialReason: string;

  @Field()
  public readonly address: EntrepriseSendAddRequestAddressInput;

  @Field(() => EntrepriseSizeEnum)
  public readonly employeeNumber: EntrepriseSizeEnum;

  @Field()
  public readonly phone: EntrepriseSendAddRequestPhoneInput;

  @Field()
  public readonly email: string;

  @Field()
  public readonly requestedBy: EntrepriseSendAddRequestRequestedByInput;
}
