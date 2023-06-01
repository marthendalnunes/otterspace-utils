export const DEFAULT_NETWORK = 10
const OTTERSPACE_CONFIG = {
  // Mainnet
  '1': {
    url:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-mainnet',
    badgeContractAddress: '0x4537e34D5044626d72b3da203e7ffE997245947C',
    raftContractAddress: '0x7465dA7E01A5FF3b2b1699EDa9E617A1329C14b8',
    blockExplorer: 'https://etherscan.io/'
  },
  // Goerli
  '5': {
    url: 'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-goerli',
    badgeContractAddress: '0xa6773847d3D2c8012C9cF62818b320eE278Ff722',
    raftContractAddress: '0xBb8997048e5F0bFe6C9D6BEe63Ede53BD0236Bb2',
    blockExplorer: 'https://goerli.etherscan.io/'
  },
  // Optimism
  '10': {
    url:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism',
    badgeContractAddress: '0x7F9279B24D1c36Fa3E517041fdb4E8788dc63D25',
    raftContractAddress: '0xa6773847d3D2c8012C9cF62818b320eE278Ff722',
    blockExplorer: 'https://optimistic.etherscan.io/'
  },
  // Polygon
  '137': {
    url:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-polygon',
    badgeContractAddress: '0x147e0dF40fdD1340C604726c670329c08176F208',
    raftContractAddress: '0xa74caa864A2562999faf38280A3aA3d09c248daA',
    blockExplorer: 'https://polygonscan.com/'
  },
  '11155111': {
    url:
      'https://api.studio.thegraph.com/query/44988/badges-sepolia/version/latest',
    badgeContractAddress: '0x639a1703CfdeDaE61A535d53890130b4257f15eb',
    raftContractAddress: '0xa74caa864A2562999faf38280A3aA3d09c248daA',
    blockExplorer: 'https://sepolia.etherscan.io/'
  }
}

export const getOtterspaceConfig = (chainId?: number) => {
  if (
    chainId === 5 ||
    chainId === 10 ||
    chainId === 1 ||
    chainId === 137 ||
    chainId === 11155111
  ) {
    return OTTERSPACE_CONFIG[chainId]
  }
  return OTTERSPACE_CONFIG[DEFAULT_NETWORK]
}
