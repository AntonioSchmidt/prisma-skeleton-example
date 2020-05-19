import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server' // TODO add redis/socket io
import {createClient, RedisClient} from 'redis'
import {promisify} from "util";

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] })
const pubsub = new PubSub()
const redis = createClient()
const redisGetAsync = promisify(redis.get).bind(redis)
export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
  redis: RedisClient
  redisGetAsync: (key: string) => Promise<string>
}

export function createContext(): Context {
  return { prisma, pubsub, redis, redisGetAsync }
}
