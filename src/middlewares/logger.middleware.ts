import {NextFunction, Request, Response} from 'express';
import {LogTypesEnum} from '../constants/logTypes.enum';
import {LogsService} from '../services/logs.service';

/**
 * @description Middleware to log all requests
 */
export const logger = (req: Request, res: Response, next: NextFunction): void => {
  LogsService.log(`Request: ${req.method} ${req.url}`, LogTypesEnum.INFO);
  next();
};
