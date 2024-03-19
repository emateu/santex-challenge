import { renderHook, act } from '@testing-library/react-hooks'
import { useStateWithStorage } from '../use-state-with-storage'

// Mock the localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useStateWithStorage', () => {
  beforeEach(() => {
    // Clear mock localStorage before each test
    window.localStorage.clear()
  })

  it('should use initial value if none in storage', () => {
    const { result } = renderHook(() => useStateWithStorage('testKey', 'initial'))

    expect(result.current[0]).toBe('initial')
  })

  it('should get value from localStorage if available', () => {
    window.localStorage.setItem('testKey', JSON.stringify('stored'))

    const { result } = renderHook(() => useStateWithStorage('testKey', 'initial'))

    expect(result.current[0]).toBe('stored')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useStateWithStorage('testKey', 'initial'))

    act(() => {
      result.current[1]('new value')
    })

    expect(result.current[0]).toBe('new value')
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('new value'))
  })
})
