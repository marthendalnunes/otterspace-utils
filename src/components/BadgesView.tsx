import Badges from '@otterspace-xyz/contracts/out/Badges.sol/Badges.json' assert { type: 'json' }
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useState } from 'react'
import { BadgeCard } from '@/components/cards/BadgeCard'
import { OTTERSPACE_CONFIG } from '@/lib/otterspace/config'
import type { IBadgeStatus, IBadge } from '@/lib/otterspace/types'

interface BadgesViewProps {
  badges: IBadge[]
  chainId: 5 | 10
  filterBy: (status: IBadgeStatus) => boolean
  title: string
  isLoading: boolean
  isSuccess: boolean
}

export const BadgesView = ({
  badges,
  chainId,
  filterBy,
  title,
  isLoading,
  isSuccess
}: BadgesViewProps) => {
  const [selectedTokenId, setSelectedTokenId] = useState<string>('')
  const { config } = usePrepareContractWrite({
    address: OTTERSPACE_CONFIG[chainId].contractAddress,
    abi: Badges.abi,
    functionName: 'unequip',
    args: [selectedTokenId]
  })
  const { write } = useContractWrite(config)

  return (
    <div className="mx-auto mt-20 max-w-4xl">
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
                    setSelectedTokenId(badge.id.replace('badges:', ''))
                    write?.()
                  }}
                  key={badge.id}
                  title={badge.spec.metadata.name}
                  image={badge.spec.metadata.image}
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
