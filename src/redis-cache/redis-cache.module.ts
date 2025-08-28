import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { Module, Logger } from '@nestjs/common';

import { RedisCacheService } from './redis-cache.service';

@Module({
  providers: [
    {
      provide: 'KEYV_INSTANCE',
      useFactory: () => {
        const logger = new Logger('RedisCacheModule');

        const redisUri = process.env.REDIS_URI || 'redis://localhost:6379';

        // TTL in milliseconds (default: 1 hour = 3600000ms)
        const redisTtl = parseInt(process.env.REDIS_TTL || '3600000', 10);

        logger.log(`Connecting to Redis at ${redisUri.replace(/\/\/.*@/, '//***:***@')}`);
        logger.log(
          `Cache TTL set to ${redisTtl}ms (${Math.round(redisTtl / 1000 / 60)} minutes)`,
        );

        return new Keyv({
          store: new KeyvRedis(redisUri, {
            namespace: 'test-namespace',
          }),
          ttl: redisTtl,
        });
      },
    },
    RedisCacheService,
  ],
  exports: ['KEYV_INSTANCE', RedisCacheService],
})
export class RedisCacheModule {}
