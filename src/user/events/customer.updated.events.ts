import { CustomerModel } from '../models';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: CustomerModel) {}
}
