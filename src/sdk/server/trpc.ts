import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { Context } from './context'

interface MetaContext {
  hideUnavailableItems: string
  locale: string
  regionId: string
  salesChannel: string
}

const t = initTRPC.context<Context>().meta<MetaContext>().create({
  transformer: superjson,
})

export const middlewareChangeContext = t.middleware(
  async ({ next, rawInput, ctx }) => {
    if (typeof rawInput === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof rawInput?.storeOptions === 'object') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { storeOptions } = rawInput
        ctx.vtex.storeOptions = storeOptions
      }
    }

    return next({
      ctx,
    })
  }
)

export const router = t.router
export const mergeRouters = t.mergeRouters
export const publicProcedure = t.procedure
export const routerChangeContext = t.procedure.use(middlewareChangeContext)
