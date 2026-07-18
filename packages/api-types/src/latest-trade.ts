import type { ApiResponse, EntityReferenceDto } from './shared'

export interface LatestTradeDto {
  entity: EntityReferenceDto
  value: {
    close_price: number
    value: number
  }
}

export type LatestTradesResponseDto = ApiResponse<LatestTradeDto[]>
