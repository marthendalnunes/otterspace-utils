import Image from 'next/image'
import { useState } from 'react'
import classNames from 'classnames'
import { RoundImageSkeleton } from '@/components/loading/RoundImageSkeleton'

interface CardImageProps {
  alt: string
  src: string
  height: number
  width: number
}

export const CardImage = ({ alt, src, height, width }: CardImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <>
      <div className="relative">
        <RoundImageSkeleton
          className={classNames('absolute top-0', { hidden: !isLoading })}
          height={height}
          width={width}
        />
        <Image
          className={classNames('rounded-full', { visible: isLoading })}
          alt={alt}
          src={src}
          height={height}
          width={width}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  )
}
