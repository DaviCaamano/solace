import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { User, UserRecord } from '#interfaces/user/user.interface';
import { WriterService } from '~persistence/prisma/writer.service';
import { ReaderService } from '~persistence/prisma/reader.service';
import { UserUpsertArgs } from 'prisma';

@Injectable()
export class UserDatabaseService extends ComponentWithLogging {
  constructor(
    private readonly writer: WriterService,
    private readonly reader: ReaderService,
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

  upsert({
    email,
    name,
    nickname,
    picture,
    zeroId,
  }: Omit<UserRecord, 'id'>): Promise<User> {
    if (!email) {
      this.report('No email provided for login');
    }
    const query: UserUpsertArgs = {
      where: {
        zeroId,
      },
      update: {
        email,
      },
      create: {
        zeroId,
        email,
      },
    };

    if (name) {
      query.update.name = name;
      query.create.name = name;
    }
    if (nickname) {
      query.update.nickname = nickname;
      query.create.nickname = nickname;
    }
    if (picture) {
      query.update.picture = picture;
      query.create.picture = picture;
    }

    try {
      return this.writer.user.upsert(query);
    } catch (err: any) {
      this.report('Failed to Upsert User', err);
    }
  }
}
