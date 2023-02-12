import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GridView } from '@/components/views/GridView'
import { getUserRafts } from '@/lib/otterspace/client'
import { TransferRaftDialog } from '@/components/dialogs/TransferRaftDialog'
import { BadgesViewSkeleton } from '@/components/loading/BadgesViewSkeleton'
import { EmptyView } from '@/components/views/EmptyView'
import { useSelectToken } from '@/hooks/useSelectToken'
import { useOtterspaceContractsWrite } from '@/hooks/useOtterspaceContractsWrite'

export const TransferRaftView = () => {
  const [toAddress, setToAddress] = useState<string>('')
  const { address, chain, selectedToken, isOpen, handleClick, handleClose } =
    useSelectToken()

  const {
    chainId,
    prepareContractWrite,
    contractWrite,
    waitForTransaction,
    onWrite
  } = useOtterspaceContractsWrite({
    args: [address, toAddress, selectedToken?.tokenId],
    contract: 'RAFT',
    functionName: 'safeTransferFrom(address,address,uint256)'
  })

  const raftsQuery = useQuery({
    queryKey: ['user-rafts', address || '', chain?.id],
    queryFn: async () => getUserRafts(address, chain?.id)
  })

  useEffect(() => {
    handleClose()
    setToAddress('')
  }, [address, chainId])

  if (raftsQuery.isLoading) {
    return <BadgesViewSkeleton />
  }

  if (typeof address === 'undefined') {
    return <EmptyView title="No wallet connected" />
  }

  if (!raftsQuery.isLoading && raftsQuery.data?.rafts?.length === 0) {
    return <EmptyView title="This Address has no rafts" />
  }

  return (
    <>
      <TransferRaftDialog
        toAddress={toAddress}
        setToAddress={setToAddress}
        onWrite={onWrite}
        prepareContractWrite={prepareContractWrite}
        contractWrite={contractWrite}
        waitForTransaction={waitForTransaction}
        chainId={chainId}
        address={address}
        image={selectedToken?.image}
        tokenId={selectedToken?.tokenId}
        title={selectedToken?.name}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <GridView
        title="Select the raft to transfer"
        badges={raftsQuery.data?.rafts}
        type="RAFT"
        handleClickBadge={handleClick}
        isLoading={raftsQuery.isLoading}
        isSuccess={raftsQuery.isSuccess}
        isError={raftsQuery.isError}
      />
    </>
  )
}
