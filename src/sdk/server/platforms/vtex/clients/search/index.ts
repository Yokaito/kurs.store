import { Options } from '@/platforms/vtex/types'
import type * as T from './types'
import { fetchAPI } from '../fetch'
import { SelectedFacet } from '@/platforms/utils'

const POLICY_KEY = 'trade-policy'
const REGION_KEY = 'region-id'
const CHANNEL_KEYS = new Set([POLICY_KEY, REGION_KEY])

export const IntelligentSearch = ({ baseURl }: Options) => {
  const baseIO = `${baseURl}/api/io`

  const addDefaultFacets = (
    facets: SelectedFacet[],
    { salesChannel, regionId }: { salesChannel: string; regionId: string }
  ) => {
    const withDefaultFacets = facets.filter(({ key }) => !CHANNEL_KEYS.has(key))

    const policyFacet = facets.find(({ key }) => key === POLICY_KEY) ?? {
      key: POLICY_KEY,
      value: salesChannel,
    }

    const regionFacet = facets.find(({ key }) => key === REGION_KEY) ?? {
      key: REGION_KEY,
      value: regionId,
    }

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
    storeOptions: { locale, salesChannel, regionId, hideUnavailableItems },
  }: T.SearchPlatformProps): Promise<T> => {
    const params = new URLSearchParams({
      page: page?.toString() ?? '1',
      count: count?.toString() ?? '10',
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

    const pathname = addDefaultFacets(selectedFacets, {
      salesChannel,
      regionId,
    })
      .map(({ key, value }) => `${key}/${value}`)
      .join('/')

    return fetchAPI(
      `${baseIO}/_v/api/intelligent-search/${type}/${pathname}?${params.toString()}`
    )
  }

  const products = (args: Omit<T.SearchPlatformProps, 'type'>) =>
    search<T.ProductSearchResult>({ ...args, type: 'product_search' })

  return {
    products,
  }
}
