import { publicProcedure, router } from '@/sdk/server/trpc'

export const IntelligentSearch = router({
  search: publicProcedure.query(async ({ ctx }) => {
    const {
      clients: { search },
      vtex: { channel },
      normalizers: { vtex },
    } = ctx

    const response = await search.products({
      query: 'product:115498950',
      page: 1,
      count: 10,
      sort: 'name:asc',
      selectedFacets: [],
      fuzzy: 'auto',
      hideUnavailableItems: false,
      locale: 'pt-BR',
      storeOptions: channel,
    })

    // use flat map to normalize the response
    const normalizedResponse = response.products.flatMap(vtex.product)

    return {
      ...response,
      products: normalizedResponse,
    }
  }),
})
