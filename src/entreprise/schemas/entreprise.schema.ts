import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type EntrepriseDocument = EntrepriseCollection & Document;
export const EntrepriseSchemaName = 'entreprise.entreprise';

@Schema({ _id: false })
class Address {
  @Prop()
  street: string;

  @Prop()
  additional?: string;

  @Prop()
  zipCode: number;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

@Schema({ _id: false })
export class GeoPoint {
  @Prop({ default: 'Point' })
  type?: string;

  @Prop({ required: true })
  coordinates: number[];
}

@Schema()
export class EntrepriseCollection {
  @Prop({ unique: true })
  uuid: string;

  @Prop({ index: 'text' })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: Address })
  address: Address;

  @Prop({ type: GeoPoint, index: '2dsphere' })
  location: GeoPoint;

  @Prop()
  activate: boolean;
}

const EntrepriseSchema = SchemaFactory.createForClass(EntrepriseCollection);

export const EntrepriseSchemaDefinition: ModelDefinition = {
  name: EntrepriseSchemaName,
  schema: EntrepriseSchema,
};
