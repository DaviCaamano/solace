/* istanbul ignore file */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '~app.module';

declare const module: any;
async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const app = await NestFactory.create(AppModule);
  const PORT = 5002;

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
