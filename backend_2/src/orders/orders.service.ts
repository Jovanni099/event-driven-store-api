import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailService } from '../email/email.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class OrdersService {
  constructor(private readonly emailService: EmailService) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await db.orm.public.Order.create({
      customerEmail: dto.customerEmail,
      shippingAmount: 0,
      discountAmount: 0,
      currency: 'KZT',
      version: 1,
    });

    for (const item of dto.items) {
      await db.orm.public.OrderItem.create({
        orderId: order.id,
        productName: item.productName,
        quantity: item.quantity,
      });
    }

    await this.emailService.sendEmail({
      to: order.customerEmail,
      subject: 'Order created successfully',
      text: `Your order ${order.id} has been created.`,
    });

    return db.orm.public.Order.where({ id: order.id }).include('items').first();
  }

  async findAllOrders() {
    return db.orm.public.Order.orderBy((order) => order.createdAt.desc())
      .include('items')
      .all();
  }

  // async findOrderById(id: string) {
  //   return db.orm.public.Order.first({ id });
  // }

  async findOrderById(id: string) {
    const order = await db.orm.public.Order.where({ id })
      .include('items')
      .first();

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }
}
