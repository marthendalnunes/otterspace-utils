import { CardImage } from '@/components/CardImage'

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
  const formattedSrc = image?.replace('ipfs://', 'https://ipfs.io/ipfs/')
  return (
    <div
      onClick={onClick}
      className="mt-4 flex h-64 w-60 cursor-pointer flex-col items-center justify-center rounded-lg border border-stone-200 transition duration-150 hover:border-stone-500"
    >
      <CardImage
        alt="Badge Image"
        src={formattedSrc || '/otter-placeholder.jpeg'}
        width={120}
        height={120}
      />
      <h3 className="mt-4 text-center text-lg font-bold">{title}</h3>
    </div>
  )
}
