import {objectType, stringArg, extendType} from '@nexus/schema'

export const Channel = objectType({
    name: 'Channel',
    definition(t): void {
        t.model.id()
        t.model.url()
        t.model.transmitting()
        t.model.createdAt()
    }
})

export const Mutation = extendType({
    type: 'Mutation',
    definition(t): void {
        t.crud.createOneChannel()
    }
})

export const Query = extendType({
    type: 'Query',
    definition(t): void {
        t.crud.channels()
        t.crud.channel()
    }
})
