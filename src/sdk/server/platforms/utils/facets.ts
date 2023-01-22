export interface SelectedFacet {
  key: string
  value: string
}

export const FACET_CROSS_SELLING_MAP = {
  buy: 'whoboughtalsobought',
  view: 'whosawalsosaw',
  similars: 'similars',
  viewAndBought: 'whosawalsobought',
  accessories: 'accessories',
  suggestions: 'suggestions',
} as const
