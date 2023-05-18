import { EntrepriseAddRequestModel } from '../models';

export class EntrepriseSentAddRequestEvent {
  constructor(public readonly form: EntrepriseAddRequestModel) {}
}
