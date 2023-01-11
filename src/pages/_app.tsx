import ErrorBoundary from '@/sdk/Error/ErrorBoundary'
import GlobalStyle from '@/styles/resets/createGlobalStyles'
import theme from '@/styles/theme/theme'
import { trpc } from '@/sdk/lib/trpc'
import type { AppType } from 'next/app'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export const MyApp: AppType<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Component {...pageProps} key={router.route} />
      </ErrorBoundary>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default trpc.withTRPC(MyApp)
