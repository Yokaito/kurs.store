import { Options } from '@/platforms/vtex/types'
import type * as T from './types'
import { fetchAPI } from '../fetch'
import { SelectedFacet } from '@/platforms/utils'

const POLICY_KEY = 'trade-policy'
const REGION_KEY = 'region-id'
const CHANNEL_KEYS = new Set([POLICY_KEY, REGION_KEY])

export const IntelligentSearch = ({
  baseURl,
  hideUnavailableItems,
}: Options) => {
  const baseIO = `${baseURl}/api/io`

  const getPolicyFacet = (salesChannel: string): SelectedFacet | null => {
    if (!salesChannel) {
      return null
    }

    return {
      key: POLICY_KEY,
      value: salesChannel,
    }
  }

  const getRegionFacet = (
    regionId: string,
    seller: string
  ): SelectedFacet | null => {
    const sellerRegionId = seller
      ? Buffer.from(`SW#${seller}`).toString('base64')
      : null
    const facet = sellerRegionId ?? regionId

    if (!facet) {
      return null
    }

    return {
      key: REGION_KEY,
      value: facet,
    }
  }

  const addDefaultFacets = (
    facets: SelectedFacet[],
    { salesChannel, regionId, seller }: T.SearchStoreOptions
  ) => {
    const withDefaultFacets = facets.filter(({ key }) => !CHANNEL_KEYS.has(key))

    const policyFacet =
      facets.find(({ key }) => key === POLICY_KEY) ??
      getPolicyFacet(salesChannel)

    const regionFacet =
      facets.find(({ key }) => key === REGION_KEY) ??
      getRegionFacet(regionId, seller)

    if (policyFacet !== null) {
      withDefaultFacets.push(policyFacet)
    }

    if (regionFacet !== null) {
      withDefaultFacets.push(regionFacet)
    }

    return withDefaultFacets
  }

  const search = <T>({
    query = '',
    page,
    count,
    sort = '',
    selectedFacets = [],
    type,
    fuzzy = 'auto',
    locale = '',
    storeOptions,
  }: T.SearchArgs): Promise<T> => {
    const params = new URLSearchParams({
      page: page.toString(),
      count: count.toString(),
      query,
      sort,
      fuzzy,
    })

    if (locale) {
      params.append('locale', locale)
    }

    if (hideUnavailableItems) {
      params.append('hideUnavailableItems', hideUnavailableItems)
    }

    const pathname = addDefaultFacets(selectedFacets, storeOptions)
      .map(({ key, value }) => `${key}/${value}`)
      .join('/')

    return fetchAPI(
      `${baseIO}/_v/api/intelligent-search/${type}/${pathname}?${params.toString()}`
    )
  }

  const products = (args: Omit<T.SearchArgs, 'type'>) =>
    search<T.ProductSearchResult>({ ...args, type: 'product_search' })

  return {
    products,
  }
}
