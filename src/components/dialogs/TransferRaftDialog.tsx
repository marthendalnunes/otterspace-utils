import { BaseDialogProps } from '@/components/dialogs/BaseDialog'
import { ContractActionDialog } from '@/components/dialogs/ContractActionDialog'
import { BadgeCardProps } from '@/components/cards/BadgeCard'

interface TransferBadgeDialogProps extends BadgeCardProps, BaseDialogProps {
  toAddress: string
  setToAddress: (toAddress: string) => void
  onWrite: () => void
  prepareContractWrite: any
  contractWrite: any
  waitForTransaction: any
  address: string
  chainId: number | undefined
  tokenId: string
}
export const TransferRaftDialog = ({
  chainId,
  toAddress,
  setToAddress,
  onWrite,
  prepareContractWrite,
  contractWrite,
  waitForTransaction,
  isOpen,
  onClose,
  image,
  title
}: TransferBadgeDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onWrite()
  }

  const handleClose = () => {
    onClose()
    setToAddress('')
    contractWrite.reset()
  }

  return (
    <ContractActionDialog
      initialTitle="Do you want to transfer this raft?"
      loadingTitle="Transferring raft..."
      successTitle="Raft transferred!"
      buttonLabel="Transfer"
      handleSubmit={handleSubmit}
      chainId={chainId}
      transactionHash={waitForTransaction.data?.transactionHash}
      isLoadingSign={contractWrite.isLoading}
      isLoadingTransaction={waitForTransaction.isLoading}
      isSuccess={waitForTransaction.isSuccess}
      isError={waitForTransaction.isError}
      errorMessage={waitForTransaction.error?.message}
      isOpen={isOpen}
      onClose={handleClose}
      isValidAction={prepareContractWrite.isSuccess}
      image={
        image
          .split('.ipfs.nftstorage.link')[0]
          ?.replace('https://', 'https://ipfs.io/ipfs/') || image
      }
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
