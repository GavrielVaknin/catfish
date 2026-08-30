import { registerAs } from '@nestjs/config';

export default registerAs('google-oauth', () => ({
  scopeApi: process.env.GOOGLE_SCOPES_API?.split(',') ?? [],
  desktop: {
    client_id: process.env.DESKTOP_CLIENT_ID ?? '',
    project_id: process.env.DESKTOP_PROJECT_ID ?? '',
    auth_uri: process.env.DESKTOP_AUTH_URI ?? '',
    token_uri: process.env.DESKTOP_TOKEN_URI ?? '',
    auth_uri_x509_cert_url: process.env.DESKTOP_AUTH_URI_X509_CERT_URL ?? '',
    client_secret: process.env.DESKTOP_CLIENT_SECRET ?? '',
    redirected_uris: process.env.DESKTOP_REDIRECTED_URIS?.split(',') ?? [],
  },
  web: {
    client_id: process.env.WEB_CLIENT_ID ?? '',
    project_id: process.env.WEB_PROJECT_ID ?? '',
    auth_uri: process.env.WEB_AUTH_URI ?? '',
    token_uri: process.env.WEB_TOKEN_URI ?? '',
    auth_uri_x509_cert_url: process.env.WEB_AUTH_URI_X509_CERT_URL ?? '',
    client_secret: process.env.WEB_CLIENT_SECRET ?? '',
    redirected_uris: process.env.WEB_REDIRECTED_URIS?.split(',') ?? [],
    origins: process.env.WEB_ORIGINS?.split(',') ?? [],
  },
}));
