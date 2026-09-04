import * as fs from 'fs';
import * as path from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, type ConfigType } from '@nestjs/config';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { googleOauthConfig } from '../config/google-oauth/index.js';
import { google } from 'googleapis';
@Injectable()
export class GoogleService {
  private readonly scopesAPI: string[];
  private readonly credentialsPath: string;

  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleCredsConfig: ConfigType<typeof googleOauthConfig>,
  ) {
    this.credentialsPath = path.join(process.cwd());
    this.scopesAPI = this.googleCredsConfig.scopeApi;
  }

  async getOAuth2ClientUrl(): Promise<{ url: string }> {
    const authClient = this.#getAuthClient();
    return this.#getAuthUrl(authClient);
  }

  #getAuthClient(): OAuth2Client {
    const authClient = new OAuth2Client(
      this.googleCredsConfig.web.client_id,
      this.googleCredsConfig.web.client_secret,
      this.googleCredsConfig.web.redirected_uris[0],
    );
    return authClient;
  }

  #getAuthUrl(authClient: OAuth2Client): { url: string } {
    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = authClient.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopesAPI,
      prompt: 'consent',
      include_granted_scopes: true,
    });
    return { url: authorizeUrl };
  }

  async getAuthClientData(code: string): Promise<{
    email?: string | null;
    refreshToken: string;
    accessToken: string;
  }> {
    const authClient = this.#getAuthClient();
    const tokenData = await authClient.getToken(code);
    const tokens = tokenData.tokens;
    const refreshToken = tokens?.refresh_token || '';
    const accessToken = tokens?.access_token || '';

    authClient.setCredentials(tokens);

    const googleAuth = google.oauth2({
      version: 'v2',
      auth: authClient,
    });

    const googleUserInfo = await googleAuth.userinfo.get();
    const email = googleUserInfo.data.email;
    return { email, refreshToken, accessToken };
  }
}
