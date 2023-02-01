import type { BadgeCardProps } from '@/components/cards/BadgeCard'
import { ContractActionDialog } from '@/components/dialogs/ContractActionDialog'

import { BaseDialogProps } from '@/components/dialogs/BaseDialog'
import { useOtterspaceContractsWrite } from '@/hooks/useOtterspaceContractsWrite'

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
  const { contractWrite, waitForTransaction, chainId, onWrite } =
    useOtterspaceContractsWrite({
      args: [tokenId],
      contract: 'BADGES',
      functionName: 'unequip'
    })

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
