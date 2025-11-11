import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { PageShell } from './PageShell.jsx'
import '../src/index.css'

export const clientRouting = true
export const hydrationCanBeAborted = true

export function render(pageContext) {
  const { Page, pageProps } = pageContext
  const page = (
    <PageShell>
      <Page {...pageProps} />
    </PageShell>
  )

  const container = document.getElementById('page-view')
  if (container.innerHTML !== '') {
    hydrateRoot(container, page)
  } else {
    const root = createRoot(container)
    root.render(page)
  }
}

