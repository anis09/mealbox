import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MealDocument = MealCollection & Document;

export const MealSchemaName = 'catalog.meal';

@Schema()
export class MealCollection {
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

export const MealSchema = SchemaFactory.createForClass(MealCollection);

export const MealSchemaDefinition: ModelDefinition = {
  name: MealSchemaName,
  schema: MealSchema,
};
