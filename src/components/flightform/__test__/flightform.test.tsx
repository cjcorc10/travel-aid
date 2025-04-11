/*
 * Hello CJ I did not implement the routing changes because currently
 * the forms behavior on submit just shows mock data.
 *
 * Describe is the parent wrapper that "describes" what component is being tested
 * it should clearly state what the test is testing
 *
 * 1. In order to test something you have to render it using RTL render function
 *    (in this case we are extending it in our utils) but render is from RTL
 *
 * 2. Next thing I do is find the elements I need to assert
 *    the first test I do is a "should render" just asserting
 *    all the elements rendered properly
 *
 * 3. Next thing I do is check events, I use the userEvent for RTL
 *    this allows us to interact with with the elements then assert
 *    something happened
 *
 * Side Note: Your prettier is not working, you may have to set prettier
 * config to our project's (prettier.config.cjs) not VScodes.
 *
 *
 * REMOVE ME LATER
 */

import { describe, expect, it, vi } from 'vitest'
import { render } from '../../../lib/test-utils'
import FlightForm from '..'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('FlightForm', () => {
  it('should render', async () => {
    render(<FlightForm setData={vi.fn()} />)
    //✅ Find all the form elements (use "testing playground chrome extension for ease")
    const typeOfTrip = screen.getByRole('combobox', { name: /trip-type/i })
    const departing = screen.getByRole('textbox', {
      name: /departing/i,
    })
    const destination = screen.getByRole('textbox', {
      name: /destination/i,
    })
    const adults = screen.getByRole('spinbutton', {
      name: /adults/i,
    })
    const children = screen.getByRole('spinbutton', {
      name: /children/i,
    })
    const fromDate = screen.getByLabelText('from')
    const toDate = screen.getByLabelText('to')
    const button = screen.getByRole('button', { name: /search/i })
    // ✅ Assert they are all in document
    expect(typeOfTrip).toBeInTheDocument()
    expect(departing).toBeInTheDocument()
    expect(destination).toBeInTheDocument()
    expect(adults).toBeInTheDocument()
    expect(children).toBeInTheDocument()
    expect(fromDate).toBeInTheDocument()
    expect(toDate).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should change roundtrip to oneway', async () => {
    // user event will allow us to start interacting with the form
    const user = userEvent.setup()
    render(<FlightForm setData={vi.fn()} />)
    const typeOfTrip = screen.getByRole('combobox', { name: /trip-type/i })
    // use userevent to select options
    await user.selectOptions(typeOfTrip, 'one-way')
    const toDate = screen.queryByLabelText('to')
    // business logic dictates when user selects one-way the form
    // does not show the to input feild, assert this is true
    expect(toDate).not.toBeInTheDocument()
  })

  // TODO: once routing logic is implemented fix this
  //   it('should route to booking page', async () => {
  //     render(<FlightForm setData={vi.fn()} />)
  //   })
})
