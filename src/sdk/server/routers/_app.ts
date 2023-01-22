import { router, mergeRouters } from '../trpc'

import { IntelligentSearch } from './vtex/search'

export const appRouter = router({
  vtex: mergeRouters(IntelligentSearch),
})

export type AppRouter = typeof appRouter
