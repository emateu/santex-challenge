import { useState, useEffect } from 'react'

// https://jotai.org/docs/utilities/storage
// `atom` is a great library for managing state in React.
//   It also has the `atomWithStorage` function that does the same thing (and more!) as `useStateWithStorage`

export function useStateWithStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Retrieve an item from storage. If the item doesn't exist, use initialValue.
  const storedValue = localStorage.getItem(key)
  const initial: T = storedValue ? JSON.parse(storedValue) : initialValue

  // Use the standard useState hook with our initial value.
  const [value, setValue] = useState<T>(initial)

  // Whenever the value changes, store it in localStorage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
