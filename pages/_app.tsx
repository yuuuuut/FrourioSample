import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import Layout from '~/components/Layout'

import '../styles/globals.css'

/**
 * Main
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
