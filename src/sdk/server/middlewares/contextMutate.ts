import { initTRPC } from '@trpc/server'
import { Context } from '../context'
import SuperJSON from 'superjson'

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
})

const middlewareMutateContext = t.middleware(
  async ({ next, rawInput, ctx }) => {
    if (
      rawInput &&
      typeof rawInput === 'object' &&
      'storeOptions' in rawInput &&
      rawInput.hasOwnProperty('storeOptions')
    ) {
      const { storeOptions } = rawInput
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctx.vtex.storeOptions = storeOptions as any
    }

    return next({
      ctx,
    })
  }
)

export const mutateContextProcedure = t.procedure.use(middlewareMutateContext)
