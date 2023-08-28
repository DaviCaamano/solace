import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class WriterService extends PrismaService {
  constructor() {
    super({ datasources: { db: { url: process.env.WRITER_DATABASE_URL } } });
  }
}
