import type { BadgeCardProps } from '@/components/cards/BadgeCard'
import { ContractActionDialog } from '@/components/dialogs/ContractActionDialog'

import { BaseDialogProps } from '@/components/dialogs/BaseDialog'
import { useBurnBadge } from '@/hooks/useBurnBadge'

interface BurnBadgeDialogProps extends BadgeCardProps, BaseDialogProps {
  tokenId: string
}

export const BurnBadgeDialog = ({
  tokenId,
  isOpen,
  onClose,
  image,
  title
}: BurnBadgeDialogProps): JSX.Element => {
  const { badgeContractWrite, badgeWaitForTransaction, chainId, onBurn } =
    useBurnBadge({
      tokenId
    })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onBurn()
  }

  return (
    <ContractActionDialog
      initialTitle="Do you want to burn this badge?"
      loadingTitle="Burning badge..."
      successTitle="Badge successfully burned 🔥"
      buttonLabel="Burn"
      handleSubmit={handleSubmit}
      chainId={chainId}
      transactionHash={badgeWaitForTransaction.data?.transactionHash}
      isLoadingSign={badgeContractWrite.isLoading}
      isLoadingTransaction={badgeWaitForTransaction.isLoading}
      isSuccess={badgeWaitForTransaction.isSuccess}
      isError={badgeWaitForTransaction.isError}
      errorMessage={badgeWaitForTransaction.error?.message}
      isOpen={isOpen}
      onClose={() => {
        onClose()
        badgeContractWrite.reset()
      }}
      image={image}
      title={title}
    />
  )
}
