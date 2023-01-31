import {
  useNetwork,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import Raft from '@otterspace-xyz/contracts/out/Raft.sol/Raft.json' assert { type: 'json' }
import { getOtterspaceConfig } from '@/lib/otterspace/config'

interface useTransferRaftProps {
  toAddress: string
  tokenId: string
}

export const useTransferRaft = ({
  toAddress,
  tokenId
}: useTransferRaftProps) => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { config } = usePrepareContractWrite({
    address: getOtterspaceConfig(chain?.id).raftContractAddress,
    abi: Raft.abi,
    functionName: 'safeTransferFrom(address,address,uint256)',
    args: [address, toAddress, tokenId]
  })

  const raftContractWrite = useContractWrite(config)
  const raftWaitForTransaction = useWaitForTransaction({
    hash: raftContractWrite.data?.hash
  })
  const onTransfer = () => raftContractWrite.write?.()

  return {
    chainId: chain?.id,
    raftContractWrite,
    raftWaitForTransaction,
    onTransfer
  }
}
