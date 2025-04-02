// https://vitest.dev/guide/browser/assertion-api.html
import '@testing-library/jest-dom/vitest'

// https://testing-library.com/docs/react-testing-library/setup
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'

server.events.on('response:mocked', ({ request, response }) => {
  console.log('💡 MSW mocked:', request.url, response.status)
})

// Start the server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test (avoid cross-test interference)
afterEach(() => server.resetHandlers())

// Close the server after all tests
afterAll(() => server.close())

afterEach(() => {
  cleanup()
})
