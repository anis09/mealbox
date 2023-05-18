import { registerAs } from '@nestjs/config';

export default registerAs('google.oauth', () => {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
});
