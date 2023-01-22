import { fetchAPI } from '../fetch'
import type * as T from './types'
import { FACET_CROSS_SELLING_MAP } from '@/sdk/server/platforms/utils'
import { Options } from '@/platforms/vtex/types'

type ValueOf<T> = T extends Record<string, infer K> ? K : never

export const VtexCommerce = ({ baseURl }: Options) => {
  return {
    catalog: {
      salesChannel: (salesChannel: string): Promise<T.SalesChannel> =>
        fetchAPI(
          `${baseURl}/api/catalog_system/pub/saleschannel/${salesChannel}`
        ),
      products: {
        crossSelling: ({
          type,
          productId,
          groupByProduct = true,
          salesChannel,
        }: {
          type: ValueOf<typeof FACET_CROSS_SELLING_MAP>
          productId: string
          groupByProduct?: boolean
          salesChannel: string
        }): Promise<T.PortalProduct[]> => {
          const params = new URLSearchParams({
            sc: salesChannel,
            groupByProduct: groupByProduct.toString(),
          })

          return fetchAPI(
            `${baseURl}/api/catalog_system/pub/products/crossselling/${type}/${productId}?${params}`
          )
        },
      },
    },
  }
}
