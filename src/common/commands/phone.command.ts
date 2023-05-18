import { Equals, IsMobilePhone } from 'class-validator';

export class Phone {
  @Equals('TN')
  country: string;

  @IsMobilePhone('ar-TN')
  number: string;
}
