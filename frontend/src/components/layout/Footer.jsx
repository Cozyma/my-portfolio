export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-70">
        © {new Date().getFullYear()} My Portfolio
      </div>
    </footer>
  )
}

