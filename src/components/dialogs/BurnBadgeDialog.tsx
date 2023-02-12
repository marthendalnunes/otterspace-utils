import type { BadgeCardProps } from '@/components/cards/BadgeCard'
import { ContractActionDialog } from '@/components/dialogs/ContractActionDialog'

import { BaseDialogProps } from '@/components/dialogs/BaseDialog'

interface BurnBadgeDialogProps extends BadgeCardProps, BaseDialogProps {
  onWrite: () => void
  chainId: number | undefined
  contractWrite: any
  waitForTransaction: any
}

export const BurnBadgeDialog = ({
  chainId,
  isOpen,
  onClose,
  image,
  title,
  contractWrite,
  waitForTransaction,
  onWrite
}: BurnBadgeDialogProps): JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onWrite()
  }

  return (
    <ContractActionDialog
      initialTitle="Do you want to burn this badge?"
      loadingTitle="Burning badge..."
      successTitle="Badge successfully burned 🔥"
      buttonLabel="Burn"
      handleSubmit={handleSubmit}
      chainId={chainId}
      transactionHash={waitForTransaction.data?.transactionHash}
      isLoadingSign={contractWrite.isLoading}
      isLoadingTransaction={waitForTransaction.isLoading}
      isSuccess={waitForTransaction.isSuccess}
      isError={waitForTransaction.isError}
      errorMessage={waitForTransaction.error?.message}
      isOpen={isOpen}
      onClose={() => {
        onClose()
        contractWrite.reset()
      }}
      image={image}
      title={title}
    />
  )
}
