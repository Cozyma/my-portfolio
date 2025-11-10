export default function Header({ theme, onChangeTheme }) {
  return (
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
            onChange={(e) => onChangeTheme?.(e.target.value)}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="cupcake">cupcake</option>
          </select>
        </div>
      </div>
    </header>
  )
}

