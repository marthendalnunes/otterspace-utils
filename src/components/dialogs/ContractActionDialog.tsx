import Link from 'next/link'
import { BadgeCard, BadgeCardProps } from '@/components/cards/BadgeCard'
import { BaseDialog, BaseDialogProps } from '@/components/dialogs/BaseDialog'
import { DialogTitle } from '@/components/dialogs/utils/DialogTitle'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { getOtterspaceConfig } from '@/lib/otterspace/config'

interface ContractActionDialogProps extends BadgeCardProps, BaseDialogProps {
  children?: React.ReactNode
  initialTitle: string
  loadingTitle: string
  successTitle: string
  isLoadingTransaction: boolean
  isLoadingSign: boolean
  isSuccess: boolean
  isError: boolean
  isValidAction?: boolean
  chainId?: number
  errorMessage?: string
  transactionHash?: string
  buttonLabel: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const ContractActionDialog = ({
  children,
  image,
  title,
  initialTitle,
  loadingTitle,
  successTitle,
  isLoadingTransaction,
  isLoadingSign,
  isSuccess,
  isError,
  isOpen,
  isValidAction = true,
  chainId,
  errorMessage,
  transactionHash,
  buttonLabel,
  onClose,
  handleSubmit
}: ContractActionDialogProps) => {
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      {isLoadingTransaction ? (
        <>
          <DialogTitle title={loadingTitle} />
          <LoadingSpinner />
        </>
      ) : isSuccess ? (
        <>
          <DialogTitle title={successTitle} />
          <p className="mt-3">
            Check on explorer:{' '}
            <Link
              href={`${
                getOtterspaceConfig(chainId).blockExplorer
              }/tx/${transactionHash}`}
              target="_blank"
              className="font-medium underline"
            >
              Transaction Hash
            </Link>
          </p>
        </>
      ) : isError ? (
        <>
          <DialogTitle title="An Error Ocurred, try again later" />
          <p>{errorMessage}</p>
        </>
      ) : (
        <>
          <DialogTitle title={initialTitle} />
          <BadgeCard image={image} title={title} />
          <form onSubmit={handleSubmit} className="mt-6">
            {children}
            <div className="mt-6 flex gap-x-4">
              <button
                onClick={onClose}
                className="w-28 rounded-lg bg-gray-600/20 px-3 py-2 text-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoadingSign || !isValidAction}
                className="w-28 rounded-lg bg-red-600 px-3 py-2 text-lg font-semibold text-white disabled:bg-red-600/70 "
              >
                {isLoadingSign ? 'Waiting' : buttonLabel}
              </button>
            </div>
          </form>
        </>
      )}
    </BaseDialog>
  )
}
