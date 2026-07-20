import { apiClient } from '@/api/api-client'
import { transformAssets } from '@/api/assets/assets-list-transformer'
import type {
  AssetsResponseDto,
  LatestTradesResponseDto
} from '@mabna/api-types'

export interface AssetListItem {
  id: string
  title: string
  tradeSymbol?: string
  closePrice?: number
  tradeValue?: number
}

export async function getAssetsList() {
  const [assetsResponse, tradesResponse] = await Promise.all([
    apiClient<AssetsResponseDto>('/assets'),
    apiClient<LatestTradesResponseDto>('/trades')
  ])

  return transformAssets(assetsResponse, tradesResponse)
}
