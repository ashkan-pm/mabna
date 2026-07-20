'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/api/get-query-client'
import type { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
