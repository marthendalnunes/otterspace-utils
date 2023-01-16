import Head from 'next/head'
import { useAccount, useNetwork } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { getUserBadges } from '@/lib/otterspace/client'
import { BadgesView } from '@/components/BadgesView'

export default function BurnPage() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId =
    chain?.id && (chain.id === 5 || chain.id === 10) ? chain.id : 5
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['user-badges', address, chain?.id],
    queryFn: async () => getUserBadges(address || '', chainId)
  })

  return (
    <>
      <Head>
        <title>Burn 🔥</title>
        <meta name="description" content="Burn your badges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <BadgesView
          title="Select the badge to 🔥"
          badges={data?.badges}
          chainId={chainId}
          filterBy={(status) => status !== 'BURNED'}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <BadgesView
          title="Burned badges 🔥"
          badges={data?.badges}
          chainId={chainId}
          filterBy={(status) => status === 'BURNED'}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </>
    </>
  )
}
