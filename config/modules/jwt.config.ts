import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', (): JwtModuleOptions => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  };
});
