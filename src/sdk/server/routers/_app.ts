import { router } from '../trpc'

import { vtex } from './vtex'

export const appRouter = router({
  vtex: vtex,
})

export type AppRouter = typeof appRouter
