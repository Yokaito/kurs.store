import { fetchAPI } from '../fetch'
import * as T from './types'
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
    checkout: {
      region: ({
        country,
        postalCode,
        salesChannel,
      }: T.RegionInput): Promise<T.Region> => {
        const params = new URLSearchParams({
          postalCode,
          country,
          salesChannel: salesChannel ?? '',
        })

        return fetchAPI(
          `${baseURl}/api/checkout/pub/regions?${params.toString()}`
        )
      },
      address: ({
        country,
        postalCode,
      }: T.AddressInput): Promise<T.Address> => {
        return fetchAPI(
          `${baseURl}/api/checkout/pub/postal-code/${country}/${postalCode}`
        )
      },
      orderForm: ({
        id,
        refreshOutdatedData = true,
        salesChannel,
      }: {
        id: string
        refreshOutdatedData?: boolean
        salesChannel: string
      }): Promise<T.OrderForm> => {
        const params = new URLSearchParams({
          refreshOutdatedData: refreshOutdatedData.toString(),
          salesChannel: salesChannel ?? '',
        })

        return fetchAPI(
          `${baseURl}/api/checkout/pub/orderForm/${id}?${params.toString()}`
        )
      },
    },
  }
}
