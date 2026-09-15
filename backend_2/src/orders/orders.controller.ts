import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    // console.log('Received order:', dto);
    // return {
    //   message: 'Order received',
    //   order: dto,
    // };
    return this.orderService.createOrder(dto);
  }
}
