import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server' // TODO add redis/socket io

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] })
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
}

export function createContext(): Context {
  return { prisma, pubsub }
}
