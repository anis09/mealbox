import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type EntrepriseRequestDocument = EntrepriseRequestCollection & Document;
export const EntrepriseRequestSchemaName = 'entreprise.request';

@Schema({ _id: false })
class RequestedBy {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  notify: boolean;
}

@Schema({ _id: false })
class Address {
  @Prop()
  street: string;

  @Prop()
  additional: string;

  @Prop()
  zipCode: number;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

@Schema()
export class EntrepriseRequestCollection {
  @Prop({ type: Types.ObjectId, unique: true })
  uuid: string;

  @Prop()
  socialReason: string;

  @Prop()
  address: Address;

  @Prop()
  employeeNumber: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  requestedBy: RequestedBy;
}

const EntrepriseRequestSchema = SchemaFactory.createForClass(
  EntrepriseRequestCollection,
);
export const EntrepriseRequestSchemaDefinition: ModelDefinition = {
  name: EntrepriseRequestSchemaName,
  schema: EntrepriseRequestSchema,
};
