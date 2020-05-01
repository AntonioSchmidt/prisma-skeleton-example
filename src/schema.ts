import { makeSchema } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import { Schemas as CommentSchemas } from "./Comment";
import { Schemas } from "./Channel";

export const schema = makeSchema({
    types: [...CommentSchemas, ...Schemas ],
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
