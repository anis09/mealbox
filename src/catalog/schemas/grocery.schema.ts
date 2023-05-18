import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type GroceryDocument = GroceryCollection & Document;

export const GrocerySchemaName = 'catalog.grocery';

@Schema()
export class GroceryCollection {
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

export const GrocerySchema = SchemaFactory.createForClass(GroceryCollection);

export const GrocerySchemaDefinition: ModelDefinition = {
  name: GrocerySchemaName,
  schema: GrocerySchema,
};
