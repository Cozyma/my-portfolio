import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import WorkCard from '../components/cards/WorkCard'

export default function Home() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [works, setWorks] = useState([])

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        setLoading(true)
        const [p, w] = await Promise.all([api.profile(), api.works()])
        if (!active) return
        setProfile(p)
        setWorks(w)
        setError('')
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
    return () => { active = false }
  }, [])

  return (
    <>
      <section className="text-center">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">My Portfolio</h2>
        <p className="mt-4 max-w-2xl mx-auto opacity-70">
          React + Tailwind + DaisyUI / Backend: Laravel on Lambda (Bref)
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

      <section id="about" className="mt-16">
        <h3 className="text-2xl font-semibold mb-4">About</h3>
        {loading && <div className="alert">読み込み中...</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {profile && (
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h4 className="card-title">{profile.name} — {profile.title}</h4>
              {profile.bio && <p className="opacity-80">{profile.bio}</p>}
              {profile.socials?.length ? (
                <div className="mt-2 flex gap-3 text-sm opacity-70">
                  {profile.socials.map((s, i) => (
                    <a key={i} className="link" href={s.url} target="_blank" rel="noreferrer">{s.type}</a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </section>

      <section id="works" className="mt-16">
        <h3 className="text-2xl font-semibold mb-4">Works</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {works.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      </section>
    </>
  )
}

