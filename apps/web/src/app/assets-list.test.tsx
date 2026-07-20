import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AssetsList from '@/app/page'

describe('Home', () => {
  it('renders the test heading', () => {
    render(<AssetsList />)

    expect(
      screen.getByRole('heading', {
        name: /تست/i
      })
    ).toBeInTheDocument()
  })
})
