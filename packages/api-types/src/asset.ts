import type { ApiResponse, EntityReferenceDto } from './shared'

export interface AssetDto {
  entity: EntityReferenceDto
  value: {
    title: string
    trade_symbol?: string
  }
}

export type AssetsResponseDto = ApiResponse<AssetDto[]>
