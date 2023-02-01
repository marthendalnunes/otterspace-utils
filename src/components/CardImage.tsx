import Image from 'next/image'
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { RoundImageSkeleton } from '@/components/loading/RoundImageSkeleton'

interface CardImageProps {
  alt: string
  src?: string
  height: number
  width: number
  className?: string
}

export const CardImage = ({
  alt,
  src,
  height,
  width,
  className
}: CardImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>(src || '')

  useEffect(() => setImgSrc(src || ''), [src])

  return (
    <div
      style={{ height, width }}
      className={classNames('relative', className)}
    >
      <RoundImageSkeleton
        className={classNames('absolute top-0', { hidden: !isLoading })}
        height={height}
        width={width}
      />
      <Image
        className={classNames('rounded-full w-full', { visible: isLoading })}
        alt={alt}
        src={imgSrc}
        height={height}
        width={width}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setImgSrc('/otter-placeholder.jpeg')
        }}
      />
    </div>
  )
}
