export const DEFAULT_NETWORK = 5
const OTTERSPACE_CONFIG = {
  // Goerli
  '5': {
    url: 'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-goerli',
    contractAddress: '0xa6773847d3D2c8012C9cF62818b320eE278Ff722',
    blockExplorer: 'https://goerli.etherscan.io/'
  },
  // Optimism
  '10': {
    url: 'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism',
    contractAddress: '0x7F9279B24D1c36Fa3E517041fdb4E8788dc63D25',
    blockExplorer: 'https://optimistic.etherscan.io/'
  }
}

export const getOtterspaceConfig = (chainId?: number) => {
  if (chainId == 5 || chainId == 10) {
    return OTTERSPACE_CONFIG[chainId]
  }
  return OTTERSPACE_CONFIG[DEFAULT_NETWORK]
}
