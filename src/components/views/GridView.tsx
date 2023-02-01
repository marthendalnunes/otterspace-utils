import { BadgeCard } from '@/components/cards/BadgeCard'
import { CardsGrid } from '@/components/layout/CardsGrid'
import { SectionHeader } from '@/components/text/SectionHeader'
import type { IBadgeStatus, IBadge } from '@/lib/otterspace/types'

interface GridViewProps {
  badges: IBadge[]
  handleClickBadge?: (tokenId: string, name: string, image: string) => void
  filterBy?: (status: IBadgeStatus) => boolean
  title: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  type?: 'BADGE' | 'RAFT'
}

export const GridView = ({
  badges,
  handleClickBadge = () => null,
  filterBy,
  title,
  isLoading,
  isSuccess,
  isError,
  type = 'BADGE'
}: GridViewProps) => {
  const filteredBadges = filterBy
    ? badges?.filter(({ status }) => filterBy(status)) || []
    : badges

  if (isLoading) {
    return null
  }

  return (
    <section className="mx-auto my-20">
      {isSuccess && filteredBadges.length > 0 ? (
        <>
          <SectionHeader title={title} />
          <CardsGrid>
            {filteredBadges.map((badge: IBadge) => {
              return (
                <BadgeCard
                  onClick={() => {
                    handleClickBadge(
                      type === 'BADGE'
                        ? badge.id.replace('badges:', '')
                        : badge.id.replace('rafts:', ''),
                      type === 'BADGE'
                        ? badge.spec.metadata.name
                        : badge.metadata.name,
                      type === 'BADGE'
                        ? badge.spec.metadata.image
                        : badge.metadata.image
                    )
                  }}
                  key={badge.id}
                  title={
                    type === 'BADGE'
                      ? badge.spec.metadata.name
                      : badge.metadata.name
                  }
                  image={
                    type === 'BADGE'
                      ? badge.spec.metadata.image
                      : badge.metadata.image
                  }
                />
              )
            })}
          </CardsGrid>
        </>
      ) : isError ? (
        <h3 className="text-red-500">An error ocurred</h3>
      ) : null}
    </section>
  )
}
