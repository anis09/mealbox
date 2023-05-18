import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DessertDocument = DessertCollection & Document;

export const DessertSchemaName = 'catalog.dessert';

@Schema()
export class DessertCollection {
  @Prop({ unique: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  image: string;
}

export const DessertSchema = SchemaFactory.createForClass(DessertCollection);

export const DessertSchemaDefinition: ModelDefinition = {
  name: DessertSchemaName,
  schema: DessertSchema,
};
