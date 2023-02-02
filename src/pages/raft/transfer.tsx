import Head from 'next/head'
import { TransferRaftView } from '@/components/views/TransferRaftView'

export default function RaftPage() {
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
