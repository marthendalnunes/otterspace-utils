import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import Badges from '@otterspace-xyz/contracts/out/Badges.sol/Badges.json' assert { type: 'json' }
import { getUserBadges } from '@/lib/otterspace/client'
import { getOtterspaceConfig } from '@/lib/otterspace/config'

interface useBurnBadgeProps {
  tokenId: string
}

export const useBurnBadge = ({ tokenId }: useBurnBadgeProps) => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const badgesQuery = useQuery({
    queryKey: ['user-badges', address || '', chain?.id],
    queryFn: async () => getUserBadges(address, chain?.id)
  })

  const { config } = usePrepareContractWrite({
    address: getOtterspaceConfig(chain?.id).contractAddress,
    abi: Badges.abi,
    functionName: 'unequip',
    args: [tokenId]
  })

  const badgeContractWrite = useContractWrite(config)
  const badgeWaitForTransaction = useWaitForTransaction({
    hash: badgeContractWrite.data?.hash
  })

  const onBurn = () => badgeContractWrite.write?.()

  return {
    chainId: chain?.id,
    badgesQuery,
    badgeContractWrite,
    badgeWaitForTransaction,
    onBurn
  }
}
