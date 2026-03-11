import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkCard from './WorkCard'

describe('WorkCard', () => {
  it('renders work title', () => {
    const work = { title: 'Test Project' }
    render(<WorkCard work={work} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const work = { title: 'Test', description: 'A test description' }
    render(<WorkCard work={work} />)
    expect(screen.getByText('A test description')).toBeInTheDocument()
  })

  it('renders tags', () => {
    const work = { title: 'Test', tags: ['React', 'Node.js'] }
    render(<WorkCard work={work} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders visit link when url provided', () => {
    const work = { title: 'Test', url: 'https://example.com' }
    render(<WorkCard work={work} />)
    const link = screen.getByRole('link', { name: 'Visit' })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('does not render visit link when url not provided', () => {
    const work = { title: 'Test' }
    render(<WorkCard work={work} />)
    expect(screen.queryByRole('link', { name: 'Visit' })).not.toBeInTheDocument()
  })
})
