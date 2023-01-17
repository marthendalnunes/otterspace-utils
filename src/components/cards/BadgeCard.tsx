import { MediaRenderer } from '@thirdweb-dev/react'

export interface BadgeCardProps {
  expiryDate?: string
  onClick?: () => void
  image: string
  title: string
}

export const BadgeCard = ({
  image,
  title,
  onClick = () => null
}: BadgeCardProps) => {
  return (
    <div
      onClick={onClick}
      className="mt-4 flex h-64 w-60 cursor-pointer flex-col items-center justify-center rounded-lg border border-dark-yellow"
    >
      <MediaRenderer
        className="rounded-full"
        src={image || '/otter-placeholder.jpeg'}
        poster={'/otter-placeholder.jpeg'}
        alt="Badge Image"
        height="120"
        width="120"
      />
      <h3 className="mt-4 text-center text-lg font-bold">{title}</h3>
    </div>
  )
}
