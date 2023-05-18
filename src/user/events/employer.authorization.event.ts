import { EmployerModel } from '../models';

export class EmployerAuthorizationEvent {
  constructor(public readonly employer: EmployerModel) {}
}
