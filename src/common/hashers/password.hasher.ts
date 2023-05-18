import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordHasher {
  private options = {
    parallelism: 10,
    memoryCost: 2730,
    timeCost: 3,
  };

  hash(plain: string, salt: string) {
    return argon2.hash(plain, {
      ...this.options,
      salt: Buffer.from(salt),
    });
  }

  needHash(hash: string) {
    return !/\$argon2.*/.test(hash);
  }

  verify(hash: string, plain: string, salt: string) {
    return argon2.verify(hash, plain, {
      ...this.options,
      salt: Buffer.from(salt),
    });
  }
}
