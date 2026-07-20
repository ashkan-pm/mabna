import { AssetsResponseDto, LatestTradesResponseDto } from '@mabna/api-types'
import { AssetListItem } from '@/api/assets/assets-list'

export function transformAssets(
  assetsResponse: AssetsResponseDto,
  tradesResponse: LatestTradesResponseDto
): AssetListItem[] {
  const tradeEntries = tradesResponse.data.map((trade) => {
    const assetId = trade.entity.id

    return [assetId, trade] as const
  })

  const tradesByAssetId = new Map(tradeEntries)

  const assetsList = assetsResponse.data.map((asset) => {
    const assetId = asset.entity.id
    const matchingTrade = tradesByAssetId.get(assetId)

    const assetListItem = {
      id: assetId,
      title: asset.value.title,
      tradeSymbol: asset.value.trade_symbol,
      closePrice: matchingTrade?.value.close_price,
      tradeValue: matchingTrade?.value.value
    } satisfies AssetListItem

    return assetListItem
  })

  return assetsList
}
