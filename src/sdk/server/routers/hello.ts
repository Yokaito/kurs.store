import { publicProcedure, router } from '../trpc'

export const helloRouter = router({
  hello: publicProcedure.query(() => {
    return {
      message: 'Hello World! Kamity',
    }
  }),
})
