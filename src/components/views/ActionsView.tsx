import Link from 'next/link'
import { BaseGrid } from '@/components/layout/BaseGrid'
import { BaseCard } from '@/components/cards/BaseCard'

export const ActionsView = () => {
  return (
    <>
      <h1 className="mt-32 mb-8 text-center text-4xl font-bold">
        Otterspace Utils
      </h1>
      <BaseGrid>
        {actions.map(({ title, description, href }) => (
          <BaseCard key={title}>
            <Link href={href}>
              <div className="w-72 py-10 px-6">
                <h3 className="text-xl font-semibold">{title} →</h3>
                <p className="mt-1">{description}</p>
              </div>
            </Link>
          </BaseCard>
        ))}
      </BaseGrid>
    </>
  )
}

const actions = [
  {
    title: 'Transfer Raft Token',
    description: 'Transfer your community raft tokens from different wallets.',
    href: '/raft/transfer'
  },
  {
    title: 'Burn Badge',
    description: "Burn badges you don't want to be associated with.",
    href: '/badge/burn'
  },
  {
    title: 'Revoke Badge',
    description: 'As a raft token holder revoke badges from users.',
    href: '/badge/revoke'
  },
  {
    title: 'Reinstate Badge',
    description: 'As a raft token holder reinstate revoked badges from users.',
    href: '/badge/reinstate'
  }
]
