// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '../../generated/prisma/client.js';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();

//     console.log('✅ Prisma connected to database');
//   }
// }

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '../../generated/prisma/client.js';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     super({
//       datasourceUrl: process.env.DATABASE_URL,
//     });
//   }

//   async onModuleInit() {
//     await this.$connect();

//     console.log('✅ Prisma connected to database');
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    console.log('✅ Prisma connected to database');
  }
}
