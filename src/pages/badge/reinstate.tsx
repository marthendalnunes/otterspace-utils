import { ReinstateBadgeView } from '@/components/views/ReinstateBadgeView'
import Head from 'next/head'

export default function ReinstatePage() {
  return (
    <>
      <Head>
        <title>Reinstate 🚨</title>
        <meta name="description" content="Reinstate your badges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReinstateBadgeView />
    </>
  )
}
