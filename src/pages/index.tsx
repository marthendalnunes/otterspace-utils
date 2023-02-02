import Head from 'next/head'
import { ActionsView } from '@/components/views/ActionsView'

export default function Home() {
  return (
    <>
      <Head>
        <title>Otterspace Utilities</title>
        <meta name="description" content="Otterspace tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ActionsView />
    </>
  )
}
