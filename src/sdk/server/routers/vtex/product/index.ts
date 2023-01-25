import { router } from '@/server/trpc'
import { mutateContextProcedure } from '@/server/middlewares'

import { SearchSchemaForUniqueProduct } from '@/platforms/vtex/clients/search/types'
import { TRPCError } from '@trpc/server'

export const Product = router({
  product: mutateContextProcedure
    .input(SearchSchemaForUniqueProduct)
    .query(async ({ ctx, input }) => {
      const {
        clients: { search },
        vtex: { storeOptions },
        normalizers: { vtex },
      } = ctx

      const { id } = input

      const response = await search.products({
        query: `product:${id}`,
        page: 1,
        count: 1,
        storeOptions,
      })

      const normalizedResponse = response.products.flatMap(vtex.product)

      if (normalizedResponse.length === 0) {
        throw new TRPCError({
          message: 'Product not found',
          code: 'NOT_FOUND',
        })
      }

      return {
        ...normalizedResponse[0],
      }
    }),
})
