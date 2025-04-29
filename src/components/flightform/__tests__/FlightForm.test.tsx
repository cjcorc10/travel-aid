import { render, screen } from '@testing-library/react'
import { describe, expect, it} from 'vitest'

import FlightForm from '..'
import userEvent from '@testing-library/user-event'

describe('FlightForm', () => {
    it('should render the form', async () => {
        render(<FlightForm />)
        expect(screen.getByRole('form')).toBeInTheDocument()
        expect(screen.getByRole('combobox', { name: /trip-type/i })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /departing/i })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /destination/i })).toBeInTheDocument()
        expect(screen.getByRole('spinbutton', { name: /adults/i })).toBeInTheDocument()
        expect(screen.getByRole('spinbutton', { name: /children/i })).toBeInTheDocument()
        expect(screen.getByLabelText('from')).toBeInTheDocument()
        expect(screen.getByLabelText('to')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
    })
    it('should switch trip to one-way', async () => {
        render(<FlightForm  />)
        expect(screen.queryByLabelText('to')).toBeInTheDocument()
        await userEvent.selectOptions(screen.getByRole('combobox', { name: /trip-type/i }), 'one-way')
        expect(screen.queryByLabelText('to')).toBeNull()
    })
})