import { makeSchema } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import { Mutation, Query, Comment, CommentSubscription } from "./Comment";
import { Mutation as ChannelMutation, Query as ChannelQuery, Channel } from "./Channel";

export const schema = makeSchema({
    types: [Query, Mutation, CommentSubscription, Comment, ChannelMutation, ChannelQuery, Channel],
    plugins: [nexusPrismaPlugin({ shouldGenerateArtifacts: true })],
    shouldGenerateArtifacts: true,
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
