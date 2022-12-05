import dotenv from 'dotenv';
import {LogTypesEnum} from './constants/logTypes.enum';
import {LogsService} from './services/logs.service';

dotenv.config();

interface IConfig {
  ORIGIN: string;
  PORT: number | string;
  MONGODB_URI: string;
  JWT_TOKEN: string;
  JWT_REFRESH_TOKEN: string;
  JWT_EXPIRATION: string;
}

const config: IConfig = {
  ORIGIN: process.env.ORIGIN || '*',
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_TOKEN: process.env.JWT_TOKEN as string,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN as string,
  JWT_EXPIRATION: '15min',
};

Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  LogsService.log(`[CONFIG] ${key} env variable loaded`, LogTypesEnum.DEBUG);
});

export default config;
