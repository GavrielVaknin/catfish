import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('google-auth')
  @Redirect()
  async googleAuth(): Promise<{ url: string }> {
    return this.appService.googleAuth();
  }

  @Get('redirect')
  @Redirect()
  async googleAuthCallback(
    @Query('code') code: string,
  ): Promise<{ url: string }> {
    const { email, refreshToken, accessToken } =
      await this.appService.getAuthClientData(code);
    const messages = await this.appService.syncGmail(refreshToken);

    console.log('Google account:', email);
    console.log('Messages:', messages.length);

    return {
      url: 'https://localhost:3000/redirect',
    };
  }
}
