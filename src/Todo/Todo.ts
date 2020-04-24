import { objectType } from '@nexus/schema'

 export const Todo = objectType({
    name: 'Todo',
    definition(t): void {
        t.model.id()
        t.model.name()
        t.model.description()
        t.model.assignee()
        t.model.priority()
    }
})

export const Mutation = objectType({
    name: 'Mutation',
    definition(t): void {
        t.crud.createOneTodo()
    }
})

export const Query = objectType({
    name: 'Query',
    definition(t): void {
        t.crud.todos()
    }
})

