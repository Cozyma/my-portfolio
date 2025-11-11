import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { PageShell } from './PageShell.jsx'

export const passToClient = ['pageProps', 'documentProps']

export async function render(pageContext) {
  const { Page, pageProps } = pageContext
  const pageHtml = renderToString(
    <PageShell>
      <Page {...pageProps} />
    </PageShell>
  )

  const { documentProps } = pageContext
  const title = documentProps?.title || 'My Portfolio'
  const description = documentProps?.description || 'Portfolio site'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="ja" data-theme="light">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      documentProps: { title, description },
    },
  }
}

