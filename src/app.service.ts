import { Injectable } from '@nestjs/common';
import { GoogleService } from './google/google.service.js';
import { GmailService } from './google/gmail.service.js';

@Injectable()
export class AppService {
  constructor(
    private readonly googleService: GoogleService,
    private readonly gmailService: GmailService,
  ) {}

  getHello(): string {
    return 'Hello World!!!';
  }

  async googleAuth(): Promise<{ url: string }> {
    return this.googleService.getOAuth2ClientUrl();
  }

  async getAuthClientData(code: string): Promise<{
    email?: string | null;
    refreshToken: string;
    accessToken: string;
  }> {
    return this.googleService.getAuthClientData(code);
  }

  async syncGmail(refreshToken: string): Promise<Buffer[]> {
    return this.gmailService.getAllRawMessages(refreshToken);
  }
}
