import { z } from 'zod'

export const FACET_CROSS_SELLING_MAP = {
  buy: 'whoboughtalsobought',
  view: 'whosawalsosaw',
  similars: 'similars',
  viewAndBought: 'whosawalsobought',
  accessories: 'accessories',
  suggestions: 'suggestions',
} as const

export const SelectedFacetSchema = z.object({
  key: z.string(),
  value: z.string(),
})

export const FacetsCrossSellingSchema = z.union([
  z.literal(FACET_CROSS_SELLING_MAP.buy),
  z.literal(FACET_CROSS_SELLING_MAP.view),
  z.literal(FACET_CROSS_SELLING_MAP.similars),
  z.literal(FACET_CROSS_SELLING_MAP.viewAndBought),
  z.literal(FACET_CROSS_SELLING_MAP.accessories),
  z.literal(FACET_CROSS_SELLING_MAP.suggestions),
])

export type FacetsCrossSelling = z.infer<typeof FacetsCrossSellingSchema>
export type SelectedFacet = z.infer<typeof SelectedFacetSchema>
