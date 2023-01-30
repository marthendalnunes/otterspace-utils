import classNames from 'classnames'

interface RoundImageSkeletonProps {
  className?: string
  height: number
  width: number
}
export const RoundImageSkeleton = ({
  className,
  height,
  width
}: RoundImageSkeletonProps) => {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-full bg-stone-200',
        className
      )}
      style={{ height: `${height}px`, width: `${width}px` }}
    ></div>
  )
}
