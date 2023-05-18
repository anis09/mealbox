import { EmployerModel } from '../models';

export class EmployerLoginEvent {
  constructor(public readonly employer: EmployerModel) {}
}
