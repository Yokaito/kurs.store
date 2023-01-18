import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import env from '@/sdk/env'

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const vtexBaseUrl = `https://${env.vtex.store.storeId}.${env.vtex.store.environment}.com.br`

  return {
    req: opts?.req,
    vtex: {
      baseUrl: vtexBaseUrl,
      config: {
        hideUnavailableItems: env.vtex.store.hideUnavailableItems.toString(),
      },
    },
  }
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>
