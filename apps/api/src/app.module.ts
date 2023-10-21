/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '~persistence/persistence.module';
import { NoteModule } from '~note/note.module';
import { UserModule } from '~user/user.module';
import { AppController } from '~app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    PersistenceModule,
    UserModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
