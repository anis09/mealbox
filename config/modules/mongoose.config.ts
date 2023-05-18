import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', (): MongooseModuleOptions => {
  return {
    uri: 'mongodb+srv://m001-student:<m001-mongodb-basics>@sandbox.jadxf.mongodb.net/?retryWrites=true&w=majority',
  };
});
