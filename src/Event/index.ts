import {objectType, stringArg} from '@nexus/schema'

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
    Query,
    Mutation
]
