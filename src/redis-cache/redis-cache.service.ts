import Keyv from 'keyv';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(@Inject('KEYV_INSTANCE') private readonly cache: Keyv) {}

  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await this.cache.get(key);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to get key "${key}": ${err.message}`, err.stack);
    }
  }

  async getObj(key: string): Promise<Record<string, any> | null> {
    try {
      const fromCache = await this.cache.get(key);
      if (!fromCache) return null;
      if (typeof fromCache === 'object') return fromCache;
      return JSON.parse(fromCache);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(
        `Failed to get object for key "${key}": ${err.message}`,
        err.stack,
      );
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 3000): Promise<void> {
    try {
      await this.cache.set(key, value, ttl);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to set key "${key}": ${err.message}`, err.stack);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.set(key, '', 1);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to remove key "${key}": ${err.message}`, err.stack);
    }
  }
}
