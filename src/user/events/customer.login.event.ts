import { CustomerModel } from '../models';

export class CustomerLoginEvent {
  constructor(public readonly customer: CustomerModel) {}
}
