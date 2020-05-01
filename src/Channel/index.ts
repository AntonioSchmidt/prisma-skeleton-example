import {objectType, inputObjectType, extendType} from '@nexus/schema'

const Channel = objectType({
    name: 'Channel',
    definition(t): void {
        t.model.id()
        t.model.url()
        t.model.transmitting()
        t.model.createdAt()
    }
})

const Mutation = extendType({
    type: 'Mutation',
    definition(t): void {
        t.crud.createOneChannel()
    }
})

const Query = extendType({
    type: 'Query',
    definition(t): void {
        t.crud.channels()
        t.crud.channel()
    }
})

const ChannelCreateInput = inputObjectType({
    name: 'ChannelCreateInput',
    definition(t): void {
        t.string('url', { nullable: false })
        t.boolean('transmitting', { default: true })
    }
})

export const Schemas = [
    ChannelCreateInput,
    Mutation,
    Channel,
    Query
]
