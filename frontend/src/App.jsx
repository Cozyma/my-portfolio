import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">My Portfolio</h1>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a className="hover:text-blue-600" href="#about">About</a>
            <a className="hover:text-blue-600" href="#works">Works</a>
            <a className="hover:text-blue-600" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Build with React + Tailwind</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Tailwind のユーティリティクラスを軸に、再利用可能なコンポーネントで UI を構成していきます。
          </p>
          <div className="mt-8 inline-flex items-center gap-3">
            <button
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setCount((c) => c + 1)}
            >
              Count: {count}
            </button>
            <a
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
              href="https://tailwindcss.com/docs/installation" target="_blank"
              rel="noreferrer"
            >
              Tailwind Docs
            </a>
          </div>
        </section>

        <section id="about" className="mt-16 grid gap-6 sm:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Card {i}</h3>
              <p className="mt-2 text-sm text-gray-600">Tailwind コンポーネントの例。</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-16 border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} My Portfolio
        </div>
      </footer>
    </div>
  )
}

export default App
