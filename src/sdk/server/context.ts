import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import env from '@/sdk/env'
import { VtexCommerce } from './platforms/vtex/clients/commerce'
import { IntelligentSearch } from './platforms/vtex/clients/search'
import { normalizers } from './normalizers'

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const {
    vtex: { store },
  } = env
  const vtexBaseUrl = `https://${store.storeId}.${store.environment}.com.br`
  const hideUnavailableItems = store.hideUnavailableItems.toString()

  const commerce = VtexCommerce({
    baseURl: vtexBaseUrl,
    hideUnavailableItems,
  })

  const search = IntelligentSearch({
    baseURl: vtexBaseUrl,
    hideUnavailableItems,
  })

  return {
    req: opts?.req,
    clients: {
      commerce,
      search,
    },
    normalizers: {
      ...normalizers(),
    },
    vtex: {
      baseUrl: vtexBaseUrl,
      channel: {
        seller: '1',
        regionId: '',
        salesChannel: '1',
      },
    },
  }
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>
