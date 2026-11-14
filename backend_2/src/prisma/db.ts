import { config } from 'dotenv';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import { Temporal } from '@js-temporal/polyfill';

config({ path: '.env.development' });

import type { Contract } from '../../prisma/contract.js';
import contractJson from '../../prisma/contract.json' with { type: 'json' };

Object.assign(globalThis, { Temporal });

const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env.DATABASE_URL!,
});

// import { config } from 'dotenv';
// import postgres from '@prisma/orm-postgres/runtime';
// import { Temporal } from '@js-temporal/polyfill';

// config({ path: '.env.development' });

// import type { Contract } from '../../prisma/contract.js';
// import contractJson from '../../prisma/contract.json' with { type: 'json' };

// Object.assign(globalThis, { Temporal });

// export const db = postgres<Contract>({
//   contract: contractJson as Contract,
//   url: process.env.DATABASE_URL!,
// }); это была вторая рабочая версия, но теперь она ошибочная

// import 'dotenv/config';
// import postgres from '@prisma/orm-postgres/runtime';

// import type { Contract } from './contract.d';
// import contractJson from './contract.json' with { type: 'json' };

// export const db = postgres<Contract>({
//   contractJson,
//   url: process.env.DATABASE_URL!,
// });
