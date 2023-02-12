import { useQuery } from '@tanstack/react-query'
import { getUserBadges } from '@/lib/otterspace/client'
import { GridView } from '@/components/views/GridView'
import { BurnBadgeDialog } from '@/components/dialogs/BurnBadgeDialog'
import { BadgesViewSkeleton } from '@/components/loading/BadgesViewSkeleton'
import { EmptyView } from '@/components/views/EmptyView'
import { useSelectToken } from '@/hooks/useSelectToken'
import { useOtterspaceContractsWrite } from '@/hooks/useOtterspaceContractsWrite'
import { useEffect } from 'react'

export const BurnBadgeView = () => {
  const { address, chain, selectedToken, isOpen, handleClick, handleClose } =
    useSelectToken()
  const badgesQuery = useQuery({
    queryKey: ['user-badges', address || '', chain?.id],
    queryFn: async () => getUserBadges(address, chain?.id)
  })

  const { contractWrite, waitForTransaction, chainId, onWrite } =
    useOtterspaceContractsWrite({
      args: [selectedToken?.tokenId],
      contract: 'BADGES',
      functionName: 'unequip'
    })
  useEffect(() => {
    handleClose()
  }, [address, chain?.id])

  if (badgesQuery.isLoading) {
    return <BadgesViewSkeleton />
  }

  if (typeof address === 'undefined') {
    return <EmptyView title="No wallet connected" />
  }

  if (!badgesQuery.isLoading && badgesQuery.data?.badges?.length === 0) {
    return <EmptyView title="This Address has no badges" />
  }

  return (
    <>
      <BurnBadgeDialog
        key={address}
        image={selectedToken.image}
        title={selectedToken.name}
        isOpen={isOpen}
        onClose={handleClose}
        contractWrite={contractWrite}
        waitForTransaction={waitForTransaction}
        chainId={chainId}
        onWrite={onWrite}
      />
      <GridView
        title="Select the badge to 🔥"
        badges={badgesQuery.data?.badges}
        handleClickBadge={handleClick}
        filterBy={(status) => status !== 'BURNED'}
        isLoading={badgesQuery.isLoading}
        isSuccess={badgesQuery.isSuccess}
        isError={badgesQuery.isError}
      />
      <GridView
        title="Burned badges 🔥"
        badges={badgesQuery.data?.badges}
        filterBy={(status) => status === 'BURNED'}
        isLoading={badgesQuery.isLoading}
        isSuccess={badgesQuery.isSuccess}
        isError={badgesQuery.isError}
      />
    </>
  )
}
