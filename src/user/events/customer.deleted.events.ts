import { CustomerModel } from '../models';

export class CustomerDeletedEvent {
  constructor(public readonly customer: CustomerModel) {}
}
