import Head from 'next/head'
import { BurnBadgeView } from '@/components/views/BurnBadgeView'

export default function BurnPage() {
  return (
    <>
      <Head>
        <title>Burn 🔥</title>
        <meta name="description" content="Burn your badges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BurnBadgeView />
    </>
  )
}
