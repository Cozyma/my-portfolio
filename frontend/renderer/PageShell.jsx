import React from 'react'
import Layout from '../src/app/Layout.jsx'

export function PageShell({ children }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

