import { router, mergeRouters } from '../trpc'

import { IntelligentSearch } from './vtex/search'
import { Product } from './vtex/product'

export const appRouter = router({
  vtex: mergeRouters(IntelligentSearch, Product),
})

export type AppRouter = typeof appRouter
