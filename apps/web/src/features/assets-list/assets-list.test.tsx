import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { assetsListQueryOptions } from '@/api/assets/assets-list-query'
import { AssetsList } from '@/features/assets-list/assets-list'

describe('AssetsList', () => {
  it('renders an asset', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity
        }
      }
    })

    queryClient.setQueryData(assetsListQueryOptions.queryKey, [
      {
        id: 'asset-1',
        title: 'شرکت تست',
        tradeSymbol: 'تست',
        closePrice: 1000,
        tradeValue: 5000
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <AssetsList />
      </QueryClientProvider>
    )

    expect(
      screen.getByRole('heading', {
        name: /تست/i
      })
    ).toBeInTheDocument()
  })
})
