import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('callback')
  authCallback(@Body() args: any) {
    this.authService.authCallback(args);
  }
}
