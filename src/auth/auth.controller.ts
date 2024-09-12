import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req: { user: any }) {
    return this.authService.login(req.user);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req: { user: any }) {
    return req.user;
  }
}
