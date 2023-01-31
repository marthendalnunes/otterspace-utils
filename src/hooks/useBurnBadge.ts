import {
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import Badges from '@otterspace-xyz/contracts/out/Badges.sol/Badges.json' assert { type: 'json' }
import { getOtterspaceConfig } from '@/lib/otterspace/config'

interface useBurnBadgeProps {
  tokenId: string
}

export const useBurnBadge = ({ tokenId }: useBurnBadgeProps) => {
  const { chain } = useNetwork()

  const { config } = usePrepareContractWrite({
    address: getOtterspaceConfig(chain?.id).badgeContractAddress,
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
    badgeContractWrite,
    badgeWaitForTransaction,
    onBurn
  }
}
