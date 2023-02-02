import { CardImage } from '@/components/CardImage'
import { BaseCard, BaseCardProps } from '@/components/cards/BaseCard'

export interface BadgeCardProps extends BaseCardProps {
  expiryDate?: string
  image: string
  title: string
}

export const BadgeCard = ({ image, title, onClick }: BadgeCardProps) => {
  const formattedSrc = image?.replace('ipfs://', 'https://ipfs.io/ipfs/')

  return (
    <BaseCard onClick={onClick}>
      <div className="flex h-64 w-60 flex-col items-center justify-center">
        <CardImage
          alt="Badge Image"
          src={formattedSrc || '/otter-placeholder.jpeg'}
          width={120}
          height={120}
        />
        <h3 className="mt-4 text-center text-lg font-bold">{title}</h3>
      </div>
    </BaseCard>
  )
}
