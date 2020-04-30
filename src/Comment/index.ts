import {objectType, stringArg, intArg, subscriptionField} from '@nexus/schema'

 export const Comment = objectType({
    name: 'Comment',
    definition(t): void {
        t.model.id()
        t.model.nickname()
        t.model.text()
        t.model.createdAt()
        t.model.channelId()
    }
})

export const Mutation = objectType({
    name: 'Mutation',
    definition(t): void {

        t.field('addComment', {
            type: 'Comment',
            args: {
                nickname: stringArg({ nullable: false }),
                text: stringArg({ nullable: false }),
                channelId: intArg({ nullable: false }),
            },
            resolve: async (_, { nickname, text, channelId }, ctx) => {
                const comment = await ctx.prisma.comment.create({
                    data: {
                        nickname,
                        text,
                        channel: {
                            connect: {
                                id: channelId
                            }
                        }
                    },
                })
                ctx.pubsub.publish(`comments-${channelId}`, comment)
                return comment;
            }
        })
    }
})

export const Query = objectType({
    name: 'Query',
    definition(t): void {
        t.crud.comments()
        t.crud.comment()

    }
})

export const CommentSubscription = subscriptionField('subscribeComments', {
    type: 'Comment',
    args: {
      streamId: stringArg({ nullable: false })
    },
    subscribe(root, { streamId }, ctx) {
        return ctx.pubsub.asyncIterator(`comments-${streamId}`)
    },
    resolve(payload) {
        return payload
    }
})

