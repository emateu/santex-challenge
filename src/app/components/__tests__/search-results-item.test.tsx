import { render, screen, fireEvent } from '@testing-library/react'
import { ProductItemFragment, useAddItemToOrderMutation } from '~/api/generated'
import { getFormattedPrice } from '~/app/utils/get-formatted-price'
import { SearchResultsItem } from '../search-results-item'

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <img />,
}))

jest.mock('~/api/generated', () => ({
  useAddItemToOrderMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}))

jest.mock('~/app/utils/get-formatted-price', () => ({
  getFormattedPrice: jest.fn(),
}))

const mockedUseAddItemToOrderMutation = useAddItemToOrderMutation as jest.Mock
const mockedGetFormattedPrice = getFormattedPrice as jest.Mock

describe('SearchResultsItem', () => {
  const mockItem = {
    name: 'Product 1',
    description: 'Description of Product 1',
    variants: [
      {
        id: 'variant-1',
        price: 1000,
      },
    ],
    assets: [
      {
        source: 'image-source-url',
      },
    ],
  } as ProductItemFragment

  it('displays product information', () => {
    mockedGetFormattedPrice.mockReturnValue('$10.00')
    render(<SearchResultsItem item={mockItem} />)
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('Description of Product 1')).toBeInTheDocument()
  })

  it('calls mutate when buy now button is clicked', () => {
    const mutateMock = jest.fn()
    mockedUseAddItemToOrderMutation.mockReturnValue([mutateMock, { loading: false }])
    render(<SearchResultsItem item={mockItem} />)
    fireEvent.click(screen.getByText('Buy Now'))
    expect(mutateMock).toHaveBeenCalled()
  })

  it('disables button and shows loading when mutation is in progress', () => {
    mockedUseAddItemToOrderMutation.mockReturnValue([jest.fn(), { loading: true }])
    render(<SearchResultsItem item={mockItem} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
