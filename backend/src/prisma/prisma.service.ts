// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor(config: ConfigService) {
//     super({
//       datasourceUrl: config.get<string>('DATABASE_URL'),
//     });
//   }

//   async onModuleInit() {
//     await this.$connect();

//     console.log('✅ Prisma connected');
//   }
// }

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

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();

//     console.log('✅ Prisma connected to database');
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    console.log('✅ Prisma connected');
  }
}
