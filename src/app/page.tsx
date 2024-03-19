import { SearchResultsPage } from './components/search-results-page'
import type { Metadata } from 'next'
import { getMetaTitle } from './utils/get-meta-title'

export const metadata: Metadata = {
  title: getMetaTitle('Welcome'),
  description: `Quick challenge to help candidates to join RBI Team to catch up with currently used technologies`,
}

export default async function Home() {
  return <SearchResultsPage />
}
