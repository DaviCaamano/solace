import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth0')
  authZeroLogin(@Body() args: any) {
    this.authService.authZeroLogin(args);
  }

}
