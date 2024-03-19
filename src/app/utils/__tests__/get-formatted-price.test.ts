import { getFormattedPrice } from '../get-formatted-price'
import { DEFAULT_LOCALE, DEFAULT_CURRENCY_CODE } from '~/app/constants'

describe('getFormattedPrice', () => {
  it('formats the price using the default currency if none is provided', () => {
    const amount = 1000 // Represents $10.00
    const formattedPrice = getFormattedPrice({ amount })
    const expectedPrice = new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: 'currency',
      currency: DEFAULT_CURRENCY_CODE,
    }).format(amount / 100)

    expect(formattedPrice).toBe(expectedPrice)
  })

  it('formats the price using the specified currency', () => {
    const amount = 1000 // Represents 10.00 in the specified currency
    const currency = 'EUR'
    const formattedPrice = getFormattedPrice({ amount, currency })
    const expectedPrice = new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: 'currency',
      currency,
    }).format(amount / 100)

    expect(formattedPrice).toBe(expectedPrice)
  })
})
