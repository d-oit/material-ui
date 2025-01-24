import { setupServer } from 'msw/node'
import { default as msw } from 'msw'

// Define handlers
const handlers: Array<msw.RequestHandler> = [
  // Add any API mocks here if needed
]

export const server = setupServer(...handlers)
