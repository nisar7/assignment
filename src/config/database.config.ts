/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config/dist';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    mongoUri: process.env.MONGO_CONNECTION_STRING,
  }),
);
