import { getMetaTitle } from '../get-meta-title'
import { BRAND_NAME } from '~/app/constants'

describe('getMetaTitle', () => {
  it('returns only the META_TITLE_SUFFIX if no title is provided', () => {
    const expected = BRAND_NAME
    const result = getMetaTitle()
    expect(result).toBe(expected)
  })

  it('returns the correct concatenated string when a title is provided', () => {
    const title = 'Test Title'
    const expected = `${title} | ${BRAND_NAME}`
    const result = getMetaTitle(title)
    expect(result).toBe(expected)
  })
})
