import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@/sdk/server/routers/_app'
import { createContext } from '@/sdk/server/context'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      // eslint-disable-next-line no-console
      console.error('Something went wrong', error)
    }
  },
})
