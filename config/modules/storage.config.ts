import { registerAs } from '@nestjs/config';
import { DriverType, StorageModuleOptions } from '@codebrew/nestjs-storage';

export default registerAs('storage', (): StorageModuleOptions => {
  return {
    default: 'statics',
    disks: {
      statics: {
        driver: DriverType.S3,
        config: {
          bucket: process.env.DISK_STATICS_S3_BUCKET,
          endpoint: process.env.DISK_STATICS_S3_ENDPOINT,
          key: process.env.DISK_STATICS_S3_API_KEY,
          secret: process.env.DISK_STATICS_S3_SECRET_KEY,
          s3ForcePathStyle:
            process.env.DISK_STATICS_S3_FORCE_PATH_STYLE === 'true',
          publicUrl: process.env.DISK_STATICS_S3_PUBLIC_URL,
        },
      },
    },
  };
});
