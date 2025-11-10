import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light')
  const changeTheme = (t) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Header theme={theme} onChangeTheme={changeTheme} />
      <main className="mx-auto max-w-6xl px-4 py-12">{children}</main>
      <Footer />
    </div>
  )
}

