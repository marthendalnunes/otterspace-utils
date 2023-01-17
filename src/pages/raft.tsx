import Head from 'next/head'
import { useAccount, useNetwork } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { getUserRafts } from '@/lib/otterspace/client'
import { BadgesView } from '@/components/BadgesView'

export default function RaftPage() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId =
    chain?.id && (chain.id === 5 || chain.id === 10) ? chain.id : 5
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['user-rafts', address, chain?.id],
    queryFn: async () => getUserRafts(address || '', chainId)
  })

  return (
    <>
      <Head>
        <title>Raft Token</title>
        <meta name="description" content="Manage your raft tokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BadgesView
        title="Raft Tokens"
        type="RAFT"
        badges={data?.rafts}
        filterBy={(status) => status !== 'BURNED'}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  )
}
