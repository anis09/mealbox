import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DrinkDocument = DrinkCollection & Document;

export const DrinkSchemaName = 'catalog.drink';

@Schema()
export class DrinkCollection {
  @Prop({ unique: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  updatedAt: Date;
}

export const DrinkSchema = SchemaFactory.createForClass(DrinkCollection);

export const DrinkSchemaDefinition: ModelDefinition = {
  name: DrinkSchemaName,
  schema: DrinkSchema,
};
