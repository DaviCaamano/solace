import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  authZeroLogin(@Body() args: any, @Req() req: Request, @Res() res: Response) {
    console.log('get get get get');
    this.authService.authZeroLoginGet(args, req, res);
    return 'true';
  }

  @Post()
  authZeroLoginPost(
    @Body() args: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('post post post post');
    this.authService.authZeroLogin(args, req, res);
  }
}
