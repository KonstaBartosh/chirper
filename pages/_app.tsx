import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Modal isOpen title='Jewish hammer' actionLabel='Submit' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  )
}
