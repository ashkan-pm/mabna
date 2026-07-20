'use client'

import { useQuery } from '@tanstack/react-query'
import { assetsListQueryOptions } from '@/api/assets/assets-list-query'

export function AssetsList() {
  const {
    data: assets,
    isPending,
    isError,
    error
  } = useQuery(assetsListQueryOptions)

  if (isPending) {
    return <p>در حال دریافت اطلاعات...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <section>
      {assets.map((asset) => (
        <article key={asset.id}>
          <h2>{asset.tradeSymbol}</h2>
          <p>{asset.title}</p>
        </article>
      ))}
    </section>
  )
}
