import Head from 'next/head'
import { TransferRaftView } from '@/components/views/TransferRaftView'

export default function RaftPage() {
  // const { address } = useAccount()
  // const { chain } = useNetwork()
  // const chainId = chain?.id
  // const { data, isLoading, isSuccess } = useQuery({
  //   queryKey: ['user-rafts', address, chain?.id],
  //   queryFn: async () => getUserRafts(address, chainId)
  // })

  return (
    <>
      <Head>
        <title>Transfer Raft Token</title>
        <meta name="description" content="Transfer your raft tokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransferRaftView />
    </>
  )
}