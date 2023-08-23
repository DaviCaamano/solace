/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '~persistence/persistence.module';
import { AuthModule } from '~auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
