import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import type { ProductSearchResult } from '@/sdk/types/vtex/ProductSearchResult'

const policyKey = 'trade-policy'
const regionKey = 'region-id'
const possibleKeys = [policyKey, regionKey]
const channelKeys = new Set(possibleKeys)

interface SelectedFacet {
  key: string
  value: string
}

const getPolicyFacet = (salesChannel: string): SelectedFacet => {
  return {
    key: policyKey,
    value: salesChannel,
  }
}

const addDefaultFacets = (facets: SelectedFacet[]) => {
  const withDefaultFacets = facets.filter(({ key }) => !channelKeys.has(key))

  const policyFacet =
    facets.find(({ key }) => key === policyKey) ?? getPolicyFacet('1')

  if (policyFacet !== null) {
    withDefaultFacets.push(policyFacet)
  }

  return withDefaultFacets
}

export const vtex = router({
  product: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        locale: z.string().optional(),
      })
    )
    .query(async ({ input: { productId, locale }, ctx }) => {
      const { vtex } = ctx
      const type = 'product_search'
      const selectedFacets: SelectedFacet[] = []

      const getProductUrl = `${ctx.vtex.baseUrl}/api/io/_v/api/intelligent-search/${type}/`

      const params = new URLSearchParams({
        locale: locale ?? 'pt-BR',
        query: `product:${productId}`,
        page: '1',
        count: '1',
        hideUnavailableItems: vtex.config.hideUnavailableItems,
      })

      const pathName = addDefaultFacets(selectedFacets)
        .map(({ key, value }) => `${key}/${value}`)
        .join('/')

      const response: ProductSearchResult = await fetch(
        `${getProductUrl}${pathName}?${params.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json())

      return {
        ...response,
      }
    }),
})
