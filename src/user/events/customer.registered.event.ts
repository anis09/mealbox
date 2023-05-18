import { CustomerModel } from '../models';

export class CustomerRegisteredEvent {
  constructor(public readonly customer: CustomerModel) {}
}
