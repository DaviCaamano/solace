import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class DatabaseService extends PrismaService {
  constructor() {
    super({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
    });
  }
}
