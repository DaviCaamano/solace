import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReaderService extends PrismaService {
  constructor() {
    super({
      datasources: {
        db: { url: process.env.READER_DATABASE_URL },
      },
    });
  }
}
