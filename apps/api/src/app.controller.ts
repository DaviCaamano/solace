import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!' + process.env.NEXT_PUBLIC_BACKEND_URL;
  }
}
