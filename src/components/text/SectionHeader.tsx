import classNames from 'classnames'

interface SectionHeaderProps {
  className?: string
  title: string
}
export const SectionHeader = ({ className, title }: SectionHeaderProps) => {
  return (
    <h2
      className={classNames(
        'px-6 text-center text-2xl font-semibold sm:text-3xl',
        className
      )}
    >
      {title}
    </h2>
  )
}
