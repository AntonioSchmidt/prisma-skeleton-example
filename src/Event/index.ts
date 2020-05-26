import {objectType, stringArg, inputObjectType} from '@nexus/schema'
import { uuid } from 'uuidv4';

const Event = objectType({
    name: 'EventHardcoded',
    definition(t): void {
        t.int('id', { nullable: false })
        t.string('name', { nullable: false })
        t.string('url', { nullable: false })
        t.string('description', { nullable: false })
        t.int('startTime', { nullable: false })
    }
})

const Query = objectType({
    name: 'Query',
    definition(t): void {
        t.field('getViewersCount', {
            type: 'Int',
            args: {
                eventUUID: stringArg({ nullable: false })
            },
            resolve: async (root, { eventUUID }, { redisGetAsync }) => {
                const value = await redisGetAsync(eventUUID)
                return parseInt(value || '0')
            }

        })
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t): void {
        t.field('joinEvent', {
            type: 'EventHardcoded',
            nullable: true,
            args: {
                hash: stringArg( { nullable: false }),
                userToken: stringArg({ nullable: false })

            },
            resolve: (root, { hash, userToken }) => {
                if (hash === 'event__1' && userToken === 'aryan123') {
                    return {
                        id: 1,
                        name: 'Aryan stream',
                        description: 'The best event eveeeer',
                        startTime: new Date().getTime(),
                        url: 'www.google.com',
                    }
                }
                return null;
            }
        })
        t.field('incrementViewersCount', {
            type: 'Int',
            args: {
                eventUUID: stringArg({ nullable: false })
            },
            resolve: async (root, { eventUUID }, { redis, redisGetAsync }) => {
                let viewersCount = parseInt(await redisGetAsync(eventUUID) || '0')
                viewersCount++
                redis.set(eventUUID, viewersCount.toString())
                return viewersCount
            }

        })
        t.field('incrementViewersCount', {
            type: 'Int',
            args: {
                eventUUID: stringArg({ nullable: false })
            },
            resolve: async (root, { eventUUID }, { redis, redisGetAsync }) => {
                let viewersCount = parseInt(await redisGetAsync(eventUUID) || '0')
                viewersCount++
                redis.set(eventUUID, viewersCount.toString())
                return viewersCount
            }

        })

        t.field('decrementViewersCount', {
            type: 'Int',
            args: {
                eventUUID: stringArg({ nullable: false })
            },
            resolve: async (root, { eventUUID }, { redis, redisGetAsync }) => {
                let viewersCount = parseInt(await redisGetAsync(eventUUID) || '0')
                if (viewersCount > 0) {
                    viewersCount--
                    redis.set(eventUUID, viewersCount.toString())
                }
                return viewersCount
            }
        })

        t.field('resetViewersCount', {
            type: 'Int',
            nullable: true,
            args: {
                eventUUID: stringArg({ nullable: false })
            },
            resolve: async (root, { eventUUID }, { redis, redisGetAsync }) => {
                redis.set(eventUUID, '0')
                return 0
            }
        })
    }
})

export const Schemas = [
    Event,
    Query,
    Mutation,
]
