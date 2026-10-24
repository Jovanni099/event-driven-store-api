import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class OrdersService {
  constructor(private readonly emailService: EmailService) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await db.orm.public.Order.create({
      customerEmail: dto.customerEmail,
      productName: dto.productName,
      quantity: dto.quantity,
    });

    await this.emailService.sendEmail({
      to: order.customerEmail,
      subject: 'Order created successfully',
      text: `Your order ${order.id} has been created.`,
    });

    return order;
  }

  async findAllOrders() {
    return db.orm.public.Order.orderBy((order) => order.createdAt.desc()).all();
  }

  async findOrderById(id: string) {
    return db.orm.public.Order.first({ id });
  }
}
