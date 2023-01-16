import { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { ETH_CHAINS, SITE_NAME } from '@/utils/config'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(ETH_CHAINS, [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

interface Web3Props {
  children: ReactNode
}

export const Web3Provider = ({ children }: Web3Props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}
