import {
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import Raft from '@otterspace-xyz/contracts/out/Raft.sol/Raft.json' assert { type: 'json' }
import Badges from '@otterspace-xyz/contracts/out/Badges.sol/Badges.json' assert { type: 'json' }

import { getOtterspaceConfig } from '@/lib/otterspace/config'

interface useOtterspaceContractsWriteProps {
  args: Array<string | number | undefined>
  contract: 'BADGES' | 'RAFT'
  functionName: string
}

export const useOtterspaceContractsWrite = ({
  args,
  contract,
  functionName
}: useOtterspaceContractsWriteProps) => {
  const { chain } = useNetwork()
  const prepareContractWrite = usePrepareContractWrite({
    address:
      contract == 'BADGES'
        ? getOtterspaceConfig(chain?.id).badgeContractAddress
        : getOtterspaceConfig(chain?.id).raftContractAddress,
    abi: contract == 'BADGES' ? Badges.abi : Raft.abi,
    functionName,
    args
  })
  const contractWrite = useContractWrite(prepareContractWrite.config)
  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash
  })
  const onWrite = () => contractWrite.write?.()

  return {
    chainId: chain?.id,
    prepareContractWrite,
    contractWrite,
    waitForTransaction,
    onWrite
  }
}
