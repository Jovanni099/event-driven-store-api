// import { Global, Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service.js';

// @Global()
// @Module({
//   providers: [PrismaService],
//   exports: [PrismaService],
// })
// export class PrismaModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
