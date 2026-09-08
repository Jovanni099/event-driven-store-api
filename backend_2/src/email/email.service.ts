import { Injectable } from '@nestjs/common';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

@Injectable()
export class EmailService {
  async sendEmail(options: SendEmailOptions): Promise<void> {
    console.log('Sending email...');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.text}`);

    // Пока имитируем отправку.
    // Реальный email provider подключим позже.
    await Promise.resolve();

    console.log('Email sent successfully.');
  }
}
