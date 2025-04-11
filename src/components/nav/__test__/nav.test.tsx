import { describe, expect, it } from 'vitest'
import { render } from '../../../lib/test-utils'
import Nav from '..'
import { screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router'

describe('Nav', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    expect(screen.getByText(/Book a flight/i)).toBeInTheDocument()
  })

  it('should route to booking page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Nav />
      </MemoryRouter>
    )

    // Test book flight link navigates to '/flights'
    const flightsLink = screen.getByRole('link', { name: /book a flight/i })
    expect(flightsLink).toHaveAttribute('href', '/flights')
  })
})
