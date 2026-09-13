import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(private readonly emailService: EmailService) {}

  async createOrder(dto: CreateOrderDto) {
    const order = {
      id: crypto.randomUUID(),
      customerEmail: dto.customerEmail,
      productName: dto.productName,
      quantity: dto.quantity,
      createdAt: new Date(),
    };

    await this.emailService.sendEmail({
      to: order.customerEmail,
      subject: 'Order created successfully',
      text: `Your order ${order.id} has been created.`,
    });

    return order;
  }
}
