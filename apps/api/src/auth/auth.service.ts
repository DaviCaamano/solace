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

  authZeroLogin(args: any, req: Request, res: Response) {
    this.log(
      `
    
    Post method:`,
      args,
    );
    this.log(
      `
    
    Post method:`,
      req,
    );
    // res.redirect('/api/auth/authorize');
  }
  authZeroLoginGet(args: any, req: Request, res: Response) {
    this.log(
      `
      
    Get method:`,
      args,
    );
    this.log(
      `
      
    Get method:`,
      req,
    );
    // res.redirect('/api/auth/authorize');
  }
}
