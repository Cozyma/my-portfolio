export default function WorkCard({ work }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h4 className="card-title">{work.title}</h4>
        {work.description && <p className="opacity-80">{work.description}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          {(work.tags || []).map((t, i) => (
            <span key={i} className="badge badge-outline">{t}</span>
          ))}
        </div>
        {work.url && (
          <a className="btn btn-sm btn-primary mt-3" href={work.url} target="_blank" rel="noreferrer">Visit</a>
        )}
      </div>
    </div>
  )
}

