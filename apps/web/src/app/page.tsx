import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { assetsListQueryOptions } from '@/api/assets/assets-list-query'
import { getQueryClient } from '@/api/get-query-client'
import { AssetsList } from '@/features/assets-list/assets-list'
import { sleep } from '@/utils/sleep'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(assetsListQueryOptions)
  await sleep(30000)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AssetsList />
    </HydrationBoundary>
  )
}
