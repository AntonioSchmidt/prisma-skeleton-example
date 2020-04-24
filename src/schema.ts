import { makeSchema } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import { Mutation, Query, Todo } from "./Todo/Todo";

export const schema = makeSchema({
    types: [Query, Mutation, Todo],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
})
