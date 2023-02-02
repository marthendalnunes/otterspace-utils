import { BadgeCardSkeleton } from '@/components/loading/BadgeCardSkeleton'
import { HeaderTextSkeleton } from '@/components/loading/HeaderTextSkeleton'
import { BaseGrid } from '@/components/layout/BaseGrid'

export const BadgesViewSkeleton = () => {
  return (
    <section className="mx-auto my-20">
      <HeaderTextSkeleton />
      <BaseGrid>
        <BadgeCardSkeleton />
        <BadgeCardSkeleton />
        <BadgeCardSkeleton />
      </BaseGrid>
    </section>
  )
}
