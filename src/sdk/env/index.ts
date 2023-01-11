import storeConfig from '@/../store.config'

export const env = {
  seo: {
    ...storeConfig.seo,
  },
  vtex: {
    authorization: {
      token: process.env.VTEX_APP_TOKEN,
      key: process.env.VTEX_APP_KEY,
    },
    store: {
      ...storeConfig.api.vtex,
    },
  },
  pages: {
    revalidate: 60 * 60 * 24, // 24 hours
  },
} as const

export default env
