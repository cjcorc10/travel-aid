import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Home from '..'

describe('App', () => {
  // Most Tests at the min would have a should render to test ui is properly rendering
  it('should render', () => {
    render(<Home />)
    expect(screen.getByText(/app/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/inital data/i)).toBeInTheDocument()
  })
  // How to test user events more on this later
  it('should fetch mock data on button event', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    expect(screen.getByText(/mock data/i)).toBeInTheDocument()
  })
})
