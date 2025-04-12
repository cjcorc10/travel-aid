import { render, screen } from '@testing-library/react'
import { describe, expect, it} from 'vitest'

import Hero from '..'

describe('Hero', () => {
    it('should render Hero component', () => {
        render(<Hero />)
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})