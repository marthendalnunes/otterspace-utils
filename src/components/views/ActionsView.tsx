import Link from 'next/link'
import { BaseGrid } from '@/components/layout/BaseGrid'
import { BaseCard } from '@/components/cards/BaseCard'

export const ActionsView = () => {
  return (
    <>
      <section className="my-8 flex flex-col gap-y-10 sm:mt-32">
        <h1 className="hidden text-center text-4xl font-bold sm:block">
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
      </section>
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
