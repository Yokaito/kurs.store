import { Sort } from './sort'
import { SelectedFacet } from '@/platforms/utils'
import { StoreOptions } from '@/platforms/vtex/types'

export interface SearchArgs {
  query?: string
  page: number
  count: number
  type: 'product_search' | 'facets'
  sort?: Sort
  selectedFacets?: SelectedFacet[]
  fuzzy?: '0' | '1' | 'auto'
  hideUnavailableItems?: boolean
  locale?: string
  storeOptions: StoreOptions
}

export type SearchStoreOptions = StoreOptions
