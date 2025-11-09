import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')

  const changeTheme = (t) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="border-b bg-base-100">
        <div className="navbar mx-auto max-w-6xl px-4">
          <div className="flex-1">
            <a className="text-xl font-semibold">My Portfolio</a>
          </div>
          <div className="flex-none gap-2">
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
              <a className="link link-hover" href="#about">About</a>
              <a className="link link-hover" href="#works">Works</a>
              <a className="link link-hover" href="#contact">Contact</a>
            </nav>
            <select
              className="select select-bordered select-sm"
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
            >
              <option value="light">light</option>
              <option value="dark">dark</option>
              <option value="cupcake">cupcake</option>
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Build with React + Tailwind + DaisyUI</h2>
          <p className="mt-4 max-w-2xl mx-auto opacity-70">
            DaisyUI で素早く土台を作り、複雑な UI は shadcn/ui（Radix）で作り込みます。
          </p>
          <div className="mt-8 inline-flex items-center gap-3">
            <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
              Count: {count}
            </button>
            <a className="btn btn-outline" href="https://daisyui.com/" target="_blank" rel="noreferrer">
              DaisyUI Docs
            </a>
          </div>
        </section>

        <section id="about" className="mt-16 grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Card {i}</h3>
                <p className="text-sm opacity-70">DaisyUI のカードコンポーネント例。</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-16 border-t bg-base-100">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-70">
          © {new Date().getFullYear()} My Portfolio
        </div>
      </footer>
    </div>
  )
}

export default App
