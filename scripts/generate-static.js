#!/usr/bin/env node
/*
  Generate sitemap.xml and robots.txt into frontend/dist/client
  - URL収集: dist/client 配下の .html（assets配下は除外）
  - Base URL: env.SITE_BASE_URL（なければ http://localhost を使用）
*/
const fs = require('fs')
const path = require('path')

const BASE_DIR = path.resolve(__dirname, '..')
const OUT_DIR = path.join(BASE_DIR, 'frontend', 'dist', 'client')
const BASE = (process.env.SITE_BASE_URL || process.env.VITE_SITE_BASE_URL || 'http://localhost').replace(/\/$/, '')

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const e of entries) {
    // skip assets and hidden dirs
    if (e.isDirectory()) {
      if (e.name === 'assets' || e.name.startsWith('.')) continue
      files = files.concat(walk(path.join(dir, e.name)))
    } else if (e.isFile()) {
      files.push(path.join(dir, e.name))
    }
  }
  return files
}

function toUrl(fileAbs) {
  const rel = path.posix.normalize(path.relative(OUT_DIR, fileAbs).split(path.sep).join('/'))
  if (!rel.endsWith('.html')) return null
  if (rel === 'index.html') return BASE + '/'
  if (rel.endsWith('/index.html')) return BASE + '/' + rel.slice(0, -'index.html'.length)
  return BASE + '/' + rel
}

function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`[sitemap] Not found: ${OUT_DIR}. Did you run build?`)
    process.exit(1)
  }
}

function writeFile(p, content) {
  fs.writeFileSync(p, content)
  console.log(`[static] wrote ${path.relative(OUT_DIR, p)}`)
}

function generate() {
  ensureOutDir()
  const now = new Date().toISOString()
  const files = walk(OUT_DIR)
  const urls = files.map(toUrl).filter(Boolean)
  if (urls.length === 0) {
    console.warn('[sitemap] No HTML files found to include.')
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n') +
    `\n</urlset>\n`

  const robots = `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`

  writeFile(path.join(OUT_DIR, 'sitemap.xml'), sitemap)
  writeFile(path.join(OUT_DIR, 'robots.txt'), robots)
}

try {
  generate()
} catch (e) {
  console.error('[static] generation failed:', e)
  process.exit(1)
}
