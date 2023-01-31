import { useState } from 'react'
import { BaseDialogProps } from '@/components/dialogs/BaseDialog'
import { ContractActionDialog } from '@/components/dialogs/ContractActionDialog'
import { BadgeCardProps } from '@/components/cards/BadgeCard'
import { useTransferRaft } from '@/hooks/useTransferRaft'

interface TransferBadgeDialogProps extends BadgeCardProps, BaseDialogProps {
  tokenId: string
}
export const TransferRaftDialog = ({
  tokenId,
  isOpen,
  onClose,
  image,
  title
}: TransferBadgeDialogProps) => {
  const [toAddress, setToAddress] = useState<string>('')

  const { chainId, onTransfer, raftContractWrite, raftWaitForTransaction } =
    useTransferRaft({ tokenId, toAddress })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onTransfer()
  }

  return (
    <ContractActionDialog
      initialTitle="Do you want to transfer this raft?"
      loadingTitle="Transferring raft..."
      successTitle="Raft transferred!"
      buttonLabel="Transfer"
      handleSubmit={handleSubmit}
      chainId={chainId}
      transactionHash={raftWaitForTransaction.data?.transactionHash}
      isLoadingSign={raftContractWrite.isLoading}
      isLoadingTransaction={raftWaitForTransaction.isLoading}
      isSuccess={raftWaitForTransaction.isSuccess}
      isError={raftWaitForTransaction.isError}
      errorMessage={raftWaitForTransaction.error?.message}
      isOpen={isOpen}
      onClose={() => {
        onClose()
        raftContractWrite.reset()
      }}
      image={image}
      title={title}
    >
      <div className="flex flex-col">
        <label htmlFor="toAddress">Receiver Address</label>
        <input
          className="peer h-8 rounded-lg border-2 p-2 invalid:border-red-500 focus:ring-0"
          required
          autoFocus
          type="text"
          id="toAddress"
          name="toAddress"
          placeholder="0x..."
          pattern="^0x[a-fA-F0-9]{40}$"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
    </ContractActionDialog>
  )
}
