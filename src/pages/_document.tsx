import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="Otterspace Utils" name="title" />
        <meta
          content="An open-source frontend to interact with Otterspace contracts."
          name="description"
        />
        <meta
          content="https://otterspace-utils.vercel.app/"
          property="og:url"
        />
        <meta content="website" property="og:type" />
        <meta content="Otterspace Utils" property="og:title" />
        <meta
          content="An open-source frontend to interact with Otterspace contracts."
          property="og:description"
        />
        <meta
          content="https://otterspace-utils.vercel.app/og.png"
          property="og:image"
        />
        <meta content="Otterspace Utils" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@VitorMarthendal" name="twitter:site" />
        <meta content="Otterspace Utils" name="twitter:title" />
        <meta
          content="An open-source frontend to interact with Otterspace contracts."
          name="twitter:description"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
