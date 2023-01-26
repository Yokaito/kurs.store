import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { Context } from './context'

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const mergeRouters = t.mergeRouters
export const publicProcedure = t.procedure

/**
 * TODO: Has to create a route to get, update and validated orderFormId
 * This route will be using storeOptions in middleware mutateContextProcedure
 * use reference of vtex (faststore) to create this route
 * because will be using the same logic
 */

/**
 * TODO: Has to find a way to save orderForm information in redux and same time in indexedDB
 * using some browser storage library (dexiejs, idb, etc)
 * References:
 * https://redux-toolkit.js.org
 * https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
 * https://github.com/machester4/redux-persist-indexeddb-storage
 */

/**
 * TODO: Find a way to send storeOptions to mutateContextProcedure in all querys and mutations
 * this storeOptions is save in redux and indexedDB. Actual implementation is using a middleware
 * and all querys and mutation have to send storeOptions in context to middleware mutate context and
 * use in rest apis
 */
