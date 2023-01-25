import { SortSchema } from './sort'
import { SelectedFacetSchema } from '@/platforms/utils'

import { z } from 'zod'

const fuzzySchema = z.union([z.literal('0'), z.literal('1'), z.literal('auto')])
const typeSchema = z.union([z.literal('product_search'), z.literal('facets')])

export const SearchSchema = z.object({
  query: z.string().optional(),
  page: z.number().min(1),
  count: z.number().min(1),
  type: typeSchema,
  sort: SortSchema.optional(),
  selectedFacets: SelectedFacetSchema.array().optional(),
  fuzzy: fuzzySchema.optional(),
  storeOptions: z.object({
    locale: z.string(),
    salesChannel: z.string(),
    regionId: z.string(),
    hideUnavailableItems: z.string().optional(),
  }),
})

export const SearchSchemaRouter = SearchSchema.omit({
  type: true,
}).extend({
  storeOptions: SearchSchema.shape.storeOptions.optional(),
})

export const SearchSchemaForUniqueProduct = SearchSchema.omit({
  query: true,
  page: true,
  count: true,
  type: true,
  sort: true,
  selectedFacets: true,
  fuzzy: true,
}).extend({
  id: z.string(),
  storeOptions: SearchSchema.shape.storeOptions.optional(),
})

export type SearchPlatformProps = z.infer<typeof SearchSchema>
export type SearchRouterProps = z.infer<typeof SearchSchemaRouter>
