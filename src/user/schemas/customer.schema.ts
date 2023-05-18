import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { EntrepriseSchemaDefinition } from 'src/entreprise/schemas';

export type CustomerDocument = CustomerCollection & Document;
export const CustomerSchemaName = 'user.customer';

@Schema()
export class CustomerCollection {
  @Prop({ type: Types.ObjectId, unique: true })
  uuid: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  entreprise: string;

  @Prop()
  updateAt?: Date;
}

const CustomerSchema = SchemaFactory.createForClass(CustomerCollection);

export const CustomerSchemaDefinition: ModelDefinition = {
  name: CustomerSchemaName,
  schema: CustomerSchema,
};
