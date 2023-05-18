import { CustomerModel } from '../models';

export class CustomerAddedEvent {
  constructor(public readonly customer: CustomerModel) {}
}
