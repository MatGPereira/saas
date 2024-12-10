import Mail from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer';

import { env } from '@/common/env';

import type { IEmail, IEmailService } from "./abstraction/email-service";

class EmailService implements IEmailService {

  private transporter?: Mail = undefined;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_PASSWORD,
      },
    });
  }

  public async send(email: IEmail): Promise<void> {
    await this.transporter!.sendMail({
      to: {
        name: email.to.name,
        address: email.to.email
      },
      from: {
        name: email.from.name,
        address: email.from.email
      },
      subject: email.subject,
      html: email.body.template
    });
  }
}

export { EmailService };
