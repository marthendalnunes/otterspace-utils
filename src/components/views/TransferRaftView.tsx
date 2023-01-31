import { useQuery } from '@tanstack/react-query'
import { GridView } from '@/components/views/GridView'
import { getUserRafts } from '@/lib/otterspace/client'
import { TransferRaftDialog } from '@/components/dialogs/TransferRaftDialog'
import { BadgesViewSkeleton } from '@/components/loading/BadgesViewSkeleton'
import { EmptyView } from '@/components/views/EmptyView'
import { useSelectToken } from '@/hooks/useSelectToken'

export const TransferRaftView = () => {
  const { address, chain, selectedToken, isOpen, handleClick, handleClose } =
    useSelectToken()
  const raftsQuery = useQuery({
    queryKey: ['user-rafts', address || '', chain?.id],
    queryFn: async () => getUserRafts(address, chain?.id)
  })

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
        filterBy={(status) => status !== 'BURNED'}
        isLoading={raftsQuery.isLoading}
        isSuccess={raftsQuery.isSuccess}
        isError={raftsQuery.isError}
      />
    </>
  )
}
