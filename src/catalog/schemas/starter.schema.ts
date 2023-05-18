import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type StarterDocument = StarterCollection & Document;

export const StarterSchemaName = 'catalog.starter';

@Schema()
export class StarterCollection {
  @Prop({ unique: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  updatedAt: Date;
}

export const StarterSchema = SchemaFactory.createForClass(StarterCollection);

export const StarterSchemaDefinition: ModelDefinition = {
  name: StarterSchemaName,
  schema: StarterSchema,
};
