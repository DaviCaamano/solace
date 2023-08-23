import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';

@Injectable()
export class AuthService extends ComponentWithLogging {
  constructor(private readonly logger: Logger) {
    super();

    this.setLogs({
      debug: (...args: any) => logger.debug(args),
      error: (...args: any) => logger.error(args),
      log: (...args: any) => logger.log(args),
      warn: (...args: any) => logger.warn(args),
      verbose: (...args: any) => logger.verbose(args),
    });
  }

  authCallback(args: any) {
    this.log(args);

    return 'Complete';
  }
}
