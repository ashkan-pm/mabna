import { queryOptions } from '@tanstack/react-query'
import { getAssetsList } from '@/api/assets/assets-list'

export const assetsListQueryOptions = queryOptions({
  queryKey: ['assets', 'list'],
  queryFn: getAssetsList,
  staleTime: 60_000
})
