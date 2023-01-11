import ErrorBoundary from '@/sdk/Error/ErrorBoundary'
import GlobalStyle from '@/styles/resets/createGlobalStyles'
import theme from '@/styles/theme/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <GlobalStyle />
    </ThemeProvider>
  )
}
