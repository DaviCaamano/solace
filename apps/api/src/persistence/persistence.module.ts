import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { WriterService } from '~persistence/prisma/writer.service';
import { ReaderService } from '~persistence/prisma/reader.service';

@Global()
@Module({
  providers: [PrismaService, WriterService, ReaderService, Logger],
  exports: [PrismaService, WriterService, ReaderService, Logger],
})
export class PersistenceModule {}
