const storeConfig = {
  seo: {
    title: 'My App',
    description: 'My App Description',
    titleTemplate: '%s | My App',
    author: 'My App Author',
  },

  platform: 'vtex',

  api: {
    vtex: {
      storeId: 'codeby',
      workspace: 'master',
      environment: 'vtexcommercestable',
      hideUnavailableItems: true,
    },
  },
}

export default storeConfig
