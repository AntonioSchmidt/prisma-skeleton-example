import { makeSchema } from "@nexus/schema";
import { Schemas } from "./Event";

export const schema = makeSchema({
    types: [...Schemas ],
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
