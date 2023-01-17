import { BadgeCard } from '@/components/cards/BadgeCard'
import type { IBadgeStatus, IBadge } from '@/lib/otterspace/types'

interface BadgesViewProps {
  badges: IBadge[]
  handleClickBadge?: (tokenId: string, name: string, image: string) => void
  filterBy: (status: IBadgeStatus) => boolean
  title: string
  isLoading: boolean
  isSuccess: boolean
  type?: 'BADGE' | 'RAFT'
}

export const BadgesView = ({
  badges,
  handleClickBadge = () => null,
  filterBy,
  title,
  isLoading,
  isSuccess,
  type = 'BADGE'
}: BadgesViewProps) => {
  return (
    <div className="mx-auto my-20 max-w-4xl">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : isSuccess ? (
        <div className="mt-4 grid grid-cols-3 items-center justify-center justify-items-center gap-2">
          {badges
            .filter(({ status }) => filterBy(status))
            .map((badge: IBadge) => {
              return (
                <BadgeCard
                  onClick={() => {
                    handleClickBadge(
                      badge.id.replace('badges:', ''),
                      badge.spec.metadata.name,
                      badge.spec.metadata.image
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
        </div>
      ) : (
        <h3>An error ocurred</h3>
      )}
    </div>
  )
}
