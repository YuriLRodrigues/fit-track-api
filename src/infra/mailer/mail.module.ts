import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { MailerRepository } from './mailer.repository';
import { NodeMailerRepository } from './node-mailer/node-mailer.repository';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASSWORD,
        },
      },
      defaults: {
        from: process.env.NODE_MAILER_FROM,
      },
    }),
  ],
  providers: [
    {
      provide: MailerRepository,
      useClass: NodeMailerRepository,
    },
  ],
  exports: [MailerRepository],
})
export class MailModule {}
