import { GqlModuleOptions } from '@nestjs/graphql';
import { registerAs } from '@nestjs/config';

export default registerAs('graphql', (): Omit<GqlModuleOptions, 'driver'> => {
  return {
    autoSchemaFile: true,
  };
});
