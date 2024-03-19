import { render, screen } from '@testing-library/react'
import { SearchEmptyState } from '../search-empty-state'

describe('Search Empty State', () => {
  it('renders no results found message', () => {
    render(<SearchEmptyState />)
    const notFoundText = screen.getByText(/No results found./i)
    expect(notFoundText).toBeInTheDocument()
  })
})
