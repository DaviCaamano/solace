/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '~persistence/persistence.module';
import { userModule } from '~user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    userModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
