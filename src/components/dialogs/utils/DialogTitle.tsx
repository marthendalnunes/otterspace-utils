import { Dialog } from '@headlessui/react'

interface DialogTitleProps {
  title: string
}

export const DialogTitle = ({ title }: DialogTitleProps) => {
  return (
    <Dialog.Title className="text-center text-xl font-semibold">
      {title}
    </Dialog.Title>
  )
}
