import { render, screen } from '@testing-library/react'
import { SearchLoadingState } from '../search-loading-state'

describe('Search Empty State', () => {
  it('renders a loading message', () => {
    render(<SearchLoadingState />)
    const loadingText = screen.getByText(/Loading.../i)
    expect(loadingText).toBeInTheDocument()
  })
})
