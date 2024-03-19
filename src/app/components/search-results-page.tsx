'use client'

import { useGetProductsQuery } from '~/api/generated'
import { SearchResultsItem } from './search-results-item'
import { SearchEmptyState } from './search-empty-state'
import { SearchLoadingState } from './search-loading-state'

export function SearchResultsPage() {
  const { data, loading } = useGetProductsQuery()
  const items = data?.products?.items

  if (loading) {
    return <SearchLoadingState />
  }

  if (!items?.length) {
    return <SearchEmptyState />
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        return <SearchResultsItem item={item} key={item.id} />
      })}
    </div>
  )
}
