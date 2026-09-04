import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/index.js';
import { appConfig } from './config/app/index.js';
import { GoogleService } from './google/google.service.js';
import { googleOauthConfig } from './config/google-oauth/index.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      load: [appConfig, googleOauthConfig],
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'catfish',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleService],
})
export class AppModule {}
