import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from '@nestjs/common';
import { Client } from 'src/client/model/client.model';
import { Admin } from "../admin/model/admin.model";
import { Market } from "../market/model/market.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService){}

  async sendClientConfirmation(client:Client):Promise<void> {
    const url = `${process.env.API_HOST}/api/clients/activate/${client.activation_link}`;
    await this.mailerService.sendMail({
      to: client.email,
      subject: 'Welcome to Clothes-Shop App! Confirm your Email!',
      template: './confirmation-client',
      context: {
        name: client.name,
        url,
      },
    });
  }

  async sendAdminConfirmation(admin:Admin):Promise<void> {
    const url = `${process.env.API_HOST}/api/admins/activate/${admin.activation_link}`;
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to Clothes-Shop App! Confirm your Email!',
      template: './confirmation',
      context: {
        name: admin.name,
        url,
      },
    });
  }

  async sendMarketConfirmation(market:Market):Promise<void> {
    const url = `${process.env.API_HOST}/api/markets/activate/${market.activation_link}`;
    await this.mailerService.sendMail({
      to: market.email,
      subject: 'Welcome to Clothes-Shop App! Confirm your Email!',
      template: './confirmation',
      context: {
        name: market.name,
        url,
      },
    });
  }
}
