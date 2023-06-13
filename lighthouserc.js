const pages = {
  home: '/',
  pdp: '/camiseta-flash/p',
  collection: '/Apps',
}

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: Object.values(pages).map((page) => `http://localhost:3000${page}`),
      startServerCommand: 'yarn serve',
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'csp-xss': 'off',
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': [
          'error',
          {
            minScore: 0.9,
          },
        ],
        'categories:seo': ['error', { minScore: 1 }],
        deprecations: 'warn',
      },
    },
  },
}
