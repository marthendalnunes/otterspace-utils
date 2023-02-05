import { Dialog } from '@headlessui/react'
import classNames from 'classnames'

interface DialogTitleProps {
  className?: string
  title: string
}

export const DialogTitle = ({ className, title }: DialogTitleProps) => {
  return (
    <Dialog.Title
      className={classNames('text-center text-xl font-semibold', className)}
    >
      {title}
    </Dialog.Title>
  )
}
