/* istanbul ignore file */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../../.env' });

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '~app.module';
const port = process.env.NEXT_PUBLIC_BACKEND_PORT || 8000;
declare const module: any;
async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
