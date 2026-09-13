import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

@Module({
  imports: [EmailModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
