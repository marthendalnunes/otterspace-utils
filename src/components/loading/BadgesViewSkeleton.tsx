import { BadgeCardSkeleton } from '@/components/loading/BadgeCardSkeleton'
import { HeaderTextSkeleton } from '@/components/loading/HeaderTextSkeleton'
import { CardsGrid } from '../layout/CardsGrid'

export const BadgesViewSkeleton = () => {
  return (
    <section className="mx-auto my-20">
      <HeaderTextSkeleton />
      <CardsGrid>
        <BadgeCardSkeleton />
        <BadgeCardSkeleton />
        <BadgeCardSkeleton />
      </CardsGrid>
    </section>
  )
}
