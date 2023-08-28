import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { LoginResponse } from '#interfaces/user/user.interface';
import { UserDatabaseService } from '~user/user-database.service';
import { LoginDto } from '~user/dto';

@Injectable()
export class UserService extends ComponentWithLogging {
  constructor(
    private readonly dbService: UserDatabaseService,
    private readonly logger: Logger,
  ) {
    super();

    this.setLogs({
      debug: (...args: any) => logger.debug(args),
      error: (...args: any) => logger.error(args),
      log: (...args: any) => logger.log(args),
      warn: (...args: any) => logger.warn(args),
      verbose: (...args: any) => logger.verbose(args),
    });
  }

  async login(user: LoginDto): Promise<LoginResponse> {
    const updatedUser = await this.dbService.upsert(user);
    return { user: updatedUser };
  }
}
