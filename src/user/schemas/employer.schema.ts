import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type EmployerDocument = EmployerCollection & Document;
export const EmployerSchemaName = 'user.employer';

@Schema()
export class EmployerCollection {
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
  updateAt?: Date;
}

const EmployerSchema = SchemaFactory.createForClass(EmployerCollection);

export const EmployerSchemaDefinition: ModelDefinition = {
  name: EmployerSchemaName,
  schema: EmployerSchema,
};
