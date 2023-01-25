import { z } from 'zod'

export const SortSchema = z.union([
  z.literal('price:desc'),
  z.literal('price:asc'),
  z.literal('orders:desc'),
  z.literal('name:desc'),
  z.literal('name:asc'),
  z.literal('release:desc'),
  z.literal('discount:desc'),
  z.literal(''),
])

export type Sort = z.infer<typeof SortSchema>
