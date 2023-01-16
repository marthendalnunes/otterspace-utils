import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainLayout } from '@/components/layout/MainLayout'
import { Web3Provider } from '@/providers/Web3'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Web3Provider>
    </QueryClientProvider>
  )
}
