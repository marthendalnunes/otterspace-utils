import { useQuery } from '@tanstack/react-query'
import { getUserBadges } from '@/lib/otterspace/client'
import { GridView } from '@/components/views/GridView'
import { BurnBadgeDialog } from '@/components/dialogs/BurnBadgeDialog'
import { BadgesViewSkeleton } from '@/components/loading/BadgesViewSkeleton'
import { EmptyView } from '@/components/views/EmptyView'
import { useSelectToken } from '@/hooks/useSelectToken'

export const BurnBadgeView = () => {
  const { address, chain, selectedToken, isOpen, handleClick, handleClose } =
    useSelectToken()
  const badgesQuery = useQuery({
    queryKey: ['user-badges', address || '', chain?.id],
    queryFn: async () => getUserBadges(address, chain?.id)
  })

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
        image={selectedToken.image}
        title={selectedToken.name}
        isOpen={isOpen}
        tokenId={selectedToken.tokenId}
        onClose={handleClose}
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
