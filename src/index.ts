import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

new ApolloServer({
        schema,
        context: createContext
}).listen(
    { port: process.env.PORT || 4000 },
).then(({ url }: { url: string }) =>
    console.log(
        `🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-apollo-server#using-the-graphql-api`,
    ),)
