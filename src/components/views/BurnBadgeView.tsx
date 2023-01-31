import { BadgesView } from '@/components/views/BadgesView'
import { BurnDialog } from '@/components/dialogs/BurnDialog'
import { BadgesViewSkeleton } from '@/components/loading/BadgesViewSkeleton'
import { EmptyView } from '@/components/views/EmptyView'
import { useSelectBadge } from '@/hooks/useSelectBadge'

export const BurnBadgeView = () => {
  const {
    address,
    badgesQuery,
    selectedToken,
    isOpen,
    handleClickBadge,
    handleClose
  } = useSelectBadge()

  if (badgesQuery.isLoading) {
    return <BadgesViewSkeleton />
  }

  if (typeof address === 'undefined') {
    return <EmptyView title="No wallet connected" />
  }
  return (
    <>
      <BurnDialog
        image={selectedToken.image}
        title={selectedToken.name}
        isOpen={isOpen}
        tokenId={selectedToken.tokenId}
        onClose={handleClose}
      />
      <BadgesView
        title="Select the badge to 🔥"
        badges={badgesQuery.data?.badges}
        handleClickBadge={handleClickBadge}
        filterBy={(status) => status !== 'BURNED'}
        isLoading={badgesQuery.isLoading}
        isSuccess={badgesQuery.isSuccess}
        isError={badgesQuery.isError}
      />
      <BadgesView
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
