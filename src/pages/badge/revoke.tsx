import Head from 'next/head'
import { RevokeBadgeView } from '@/components/views/RevokeBadgeView'

export default function RevokePage() {
  return (
    <>
      <Head>
        <title>Revoke 🚨</title>
        <meta name="description" content="Revoke your badges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RevokeBadgeView />
    </>
  )
}
