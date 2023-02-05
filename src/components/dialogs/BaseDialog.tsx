import { Dialog } from '@headlessui/react'

export interface BaseDialogProps {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const BaseDialog = ({ children, isOpen, onClose }: BaseDialogProps) => {
  return (
    <Dialog className="min-h-screen" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-gray-600/50">
        <Dialog.Panel className="mx-4 flex min-h-[500px] w-full flex-col items-center justify-center rounded-lg bg-white p-8 xs:max-w-md">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
