'use client'

import NextImage from 'next/image'
import { clsx } from 'clsx'
import { ProductItemFragment, useAddItemToOrderMutation } from '~/api/generated'
import { getFormattedPrice } from '../utils/get-formatted-price'

interface ProductListItemProps {
  item: ProductItemFragment
}

export function SearchResultsItem({ item }: ProductListItemProps) {
  const [mutate, { loading }] = useAddItemToOrderMutation({
    refetchQueries: ['getOrder'],
  })

  const variant = item.variants[0]

  const addToCart = () => {
    mutate({
      variables: {
        productVariantId: variant.id,
        quantity: 1,
      },
    })
  }

  return (
    <div className="flex rounded-sm p-6 space-x-6 bg-white shadow focus-style">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <NextImage
          fill
          className="bg-cover rounded-md shadow-xl"
          sizes="200px"
          src={item.assets[0].source}
          alt={item.name}
        />
      </div>
      <div className="flex-grow space-y-2">
        <div className="text-xl">{item.name}</div>
        <div className="font-medium">{getFormattedPrice({ amount: variant.price })}</div>
        <div className="text-xs text-gray-500">{item.description}</div>
        <div>
          <button
            onClick={() => addToCart()}
            className={clsx(
              'mt-3 bg-blue-700 w-36 text-white transition hover:bg-blue-800 px-3 py-1.5 rounded-md',
              { 'opacity-50 cursor-progress': loading }
            )}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
