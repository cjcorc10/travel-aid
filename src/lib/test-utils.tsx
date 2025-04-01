// https://testing-library.com/docs/react-testing-library/setup
import { render, queries, within, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

const allQueries = {
  ...queries,
}

const customScreen = within(document.body, allQueries)
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { queries: allQueries, ...options })

export * from '@testing-library/react'
export { customScreen as screen, customRender as render }
