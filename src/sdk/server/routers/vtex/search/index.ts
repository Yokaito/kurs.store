import { router } from '@/server/trpc'
import { mutateContextProcedure } from '@/server/middlewares'

import { SearchSchemaRouter } from '@/platforms/vtex/clients/search/types'

export const IntelligentSearch = router({
  search: mutateContextProcedure
    .input(SearchSchemaRouter)
    .query(async ({ ctx, input }) => {
      const {
        clients: { search },
        vtex: { storeOptions },
        normalizers: { vtex },
      } = ctx

      const {
        count = 10,
        page = 1,
        fuzzy = 'auto',
        selectedFacets,
        query,
        sort = 'name:asc',
      } = input

      const response = await search.products({
        query,
        page,
        count,
        sort,
        selectedFacets,
        fuzzy,
        storeOptions,
      })

      const normalizedResponse = response.products.flatMap(vtex.product)

      return {
        ...response,
        products: normalizedResponse,
      }
    }),
})
