import {LogTypes} from '../constants/logTypes.enum';

class LogsService {
  log(str: string, logType: LogTypes = 'info'): void {
    const logMessage = typeof str !== 'string' ? JSON.stringify(str) : str;

    const logTypes = {
      warn: `\x1b[34m${logMessage}\x1b[0m`,
      error: `\x1b[31m${logMessage}\x1b[0m`,
      info: `\x1b[32m${logMessage}\x1b[0m`,
      debug: `\x1b[34m${logMessage}\x1b[0m`,
    };
    // eslint-disable-next-line no-console
    console[logType](logTypes[logType]);
  }
}

const logsService = new LogsService();

export {logsService as LogsService};
