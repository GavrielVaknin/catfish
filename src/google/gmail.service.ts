import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { google } from 'googleapis';
import { googleOauthConfig } from '../config/google-oauth/index.js';
import { type ConfigType } from '@nestjs/config';

@Injectable()
export class GmailService {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleCredsConfig: ConfigType<typeof googleOauthConfig>,
  ) {}

  private async createClient(refreshToken: string) {
    const auth = new google.auth.OAuth2(
      this.googleCredsConfig.web.client_id,
      this.googleCredsConfig.web.client_secret,
      this.googleCredsConfig.web.redirected_uris[0],
    );

    auth.setCredentials({
      refresh_token: refreshToken,
    });

    return google.gmail({
      version: 'v1',
      auth,
    });
  }

  async getRawMessage(
    messageId: string,
    refreshToken: string,
  ): Promise<Buffer> {
    const gmail = await this.createClient(refreshToken);
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'raw',
    });

    if (!response.data.raw) {
      throw new InternalServerErrorException(
        'Gmail message does not contain raw data',
      );
    }

    return Buffer.from(response.data.raw, 'base64url');
  }

  async getAllRawMessages(refreshToken: string): Promise<Buffer[]> {
    const messages: Buffer[] = [];

    let pageToken: string | undefined;
    const gmail = await this.createClient(refreshToken);
    do {
      const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 100,
        pageToken,
      });

      for (const message of response.data.messages ?? []) {
        if (!message.id) {
          continue;
        }

        const response = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'raw',
        });

        if (!response.data.raw) {
          throw new InternalServerErrorException(
            `Gmail message ${message.id} does not contain raw data`,
          );
        }

        messages.push(Buffer.from(response.data.raw, 'base64url'));
      }

      pageToken = response.data.nextPageToken ?? undefined;
    } while (pageToken);

    return messages;
  }
}
