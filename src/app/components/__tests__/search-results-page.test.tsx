import { render, screen } from '@testing-library/react'
import { useGetProductsQuery } from '~/api/generated'
import { SearchResultsPage } from '../search-results-page'

jest.mock('~/api/generated', () => ({
  useGetProductsQuery: jest.fn(),
}))

jest.mock('../search-results-item', () => ({
  SearchResultsItem: (props: { item: { id: number; title: string } }) => (
    <div data-testid={`item-${props.item.id}`}>{props.item.title}</div>
  ),
}))

jest.mock('../search-empty-state', () => ({
  SearchEmptyState: () => <div>Empty State</div>,
}))

jest.mock('../search-loading-state', () => ({
  SearchLoadingState: () => <div>Loading</div>,
}))

const mockedUseGetProductsQuery = useGetProductsQuery as jest.Mock

describe('SearchResultsPage', () => {
  it('renders loading state when data is being fetched', () => {
    mockedUseGetProductsQuery.mockReturnValue({ data: undefined, loading: true })
    render(<SearchResultsPage />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('renders empty state when no items are returned', () => {
    mockedUseGetProductsQuery.mockReturnValue({ data: { products: { items: [] } }, loading: false })
    render(<SearchResultsPage />)
    expect(screen.getByText('Empty State')).toBeInTheDocument()
  })

  it('renders items when data is loaded', () => {
    const items = [
      { id: '1', title: 'Product 1' },
      { id: '2', title: 'Product 2' },
    ]
    mockedUseGetProductsQuery.mockReturnValue({ data: { products: { items } }, loading: false })
    render(<SearchResultsPage />)
    expect(screen.getByTestId('item-1')).toHaveTextContent('Product 1')
    expect(screen.getByTestId('item-2')).toHaveTextContent('Product 2')
  })
})
