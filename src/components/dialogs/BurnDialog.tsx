import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { BadgeCard } from '@/components/cards/BadgeCard'
import type { BadgeCardProps } from '@/components/cards/BadgeCard'
import { DialogTitle } from '@/components/dialogs/DialogTitle'
import { useBurnBadge } from '@/hooks/useBurnBadge'
import { getOtterspaceConfig } from '@/lib/otterspace/config'

interface BurnDialogProps extends BadgeCardProps {
  tokenId: string
  isOpen: boolean
  onClose: () => void
}

export const BurnDialog = ({
  tokenId,
  isOpen,
  onClose,
  image,
  title
}: BurnDialogProps): JSX.Element => {
  const { badgeContractWrite, badgeWaitForTransaction, chainId } = useBurnBadge(
    {
      tokenId
    }
  )

  return (
    <Dialog className="min-h-screen" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex min-h-screen items-center justify-center border bg-gray-600/50">
        <Dialog.Panel className="flex h-[460px] w-full max-w-md flex-col items-center justify-center rounded-lg bg-white p-8">
          {badgeWaitForTransaction.isLoading ? (
            <>
              <DialogTitle title="Burning badge..." />
              <div className="mt-8" role="status">
                <span className="animate-pulse text-6xl">🔥</span>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : badgeWaitForTransaction.isSuccess ? (
            <>
              <DialogTitle title="Badge successfully burned 🔥" />
              <p className="mt-3">
                Check on explorer:{' '}
                <Link
                  href={`${getOtterspaceConfig(chainId).blockExplorer}/tx/${
                    badgeWaitForTransaction.data?.transactionHash
                  }`}
                  target="_blank"
                  className="font-medium underline"
                >
                  Transaction Hash
                </Link>
              </p>
            </>
          ) : badgeWaitForTransaction.isError ? (
            <>
              <DialogTitle title="An Error Ocurred, try again later" />
              <p>{badgeWaitForTransaction.error?.message}</p>
            </>
          ) : (
            <>
              <DialogTitle title=" Are you Sure you want to burn this badge?" />
              <BadgeCard image={image} title={title} />
              <div className="mt-6 flex gap-x-4">
                <button
                  onClick={onClose}
                  className="w-28 rounded-lg bg-gray-600/20 px-3 py-2 text-lg text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => badgeContractWrite.write?.()}
                  disabled={badgeContractWrite.isLoading}
                  className="w-28 rounded-lg bg-red-600 px-3 py-2 text-lg font-semibold text-white disabled:bg-red-600/70"
                >
                  {badgeContractWrite.isLoading ? 'Waiting' : 'Burn'}
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
