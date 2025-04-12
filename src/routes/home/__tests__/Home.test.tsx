import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Home from '..'

describe('Home', () => {
  // Most Tests at the min would have a should render to test ui is properly rendering
  it('should render', () => {
    render(<Home />)
    expect(screen.getByText(/initial data/i)).toBeInTheDocument()

  })
  // How to test user events more on this later
  it('should fetch mock data on button event', async () => {
    render(<Home />)
    expect(screen.queryByText(/mock data/i)).toBeNull()
    await userEvent.click(screen.getByRole('button'))
    expect(screen.queryByText(/mock data/i)).toBeInTheDocument()
  })
})
