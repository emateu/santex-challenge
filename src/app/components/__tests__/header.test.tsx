import { render, screen } from '@testing-library/react'
import { useGetOrderQuery } from '~/api/generated'
import { Header } from '../header'

jest.mock('~/api/generated', () => ({
  useGetOrderQuery: jest.fn(),
}))

jest.mock('~/app/utils/get-formatted-price', () => ({
  getFormattedPrice: (params: { amount: number }) => `$${params.amount}`,
}))

const mockedUseGetOrderQuery = useGetOrderQuery as jest.Mock

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state correctly', () => {
    mockedUseGetOrderQuery.mockReturnValue({ data: undefined, loading: true })
    render(<Header />)

    // Since the "Subtotal" text is not rendered during loading, it should not be in the document
    expect(screen.queryByText('Subtotal')).not.toBeInTheDocument()
    // The loading state should be rendered
    expect(screen.getByTestId('subtotal-loading-state')).toBeInTheDocument()
  })

  it('displays the correct subtotal when data is loaded', () => {
    const mockTotal = 100
    mockedUseGetOrderQuery.mockReturnValue({
      data: { activeOrder: { total: mockTotal } },
      loading: false,
    })
    render(<Header />)
    expect(screen.getByText(`Subtotal: $${mockTotal}`)).toBeInTheDocument()
  })

  it('shows $0 when there is no data', () => {
    mockedUseGetOrderQuery.mockReturnValue({ data: undefined, loading: false })
    render(<Header />)
    expect(screen.getByText('Subtotal: $0')).toBeInTheDocument()
  })
})
