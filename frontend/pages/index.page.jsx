import React from 'react'
import Home from '../src/pages/Home.jsx'

export const documentProps = {
  title: 'My Portfolio',
  description: 'フロントはVite+React、SSGで静的配信'
}

export function Page() {
  return <Home />
}
