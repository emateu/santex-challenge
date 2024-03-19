'use client'

import { useGetOrderQuery } from '~/api/generated'
import { BRAND_NAME } from '../constants'
import { getFormattedPrice } from '../utils/get-formatted-price'

export function Header() {
  const { data, loading } = useGetOrderQuery()

  return (
    <header className="bg-gray-100 px-4 shadow">
      <div className="w-full max-w-2xl m-auto py-4">
        <h1 className="font-medium text-gray-600">{BRAND_NAME}</h1>
        <div className="flex items-center h-6">
          {loading ? (
            <div
              data-testid="subtotal-loading-state"
              className="animate-pulse w-32 bg-gray-300 h-4 my-1 rounded-md"
            />
          ) : (
            <div className="font-medium text-gray-800">
              Subtotal: {getFormattedPrice({ amount: data?.activeOrder?.total || 0 })}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
