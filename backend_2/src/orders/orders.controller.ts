import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Controller('orders')
export class OrdersController {
  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    console.log('Received order:', dto);

    return {
      message: 'Order received',
      order: dto,
    };
  }
}
