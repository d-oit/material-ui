import { http, HttpResponse } from 'msw'
import { createMiddleware } from 'msw/node'

// Define handlers
const handlers = [
  // Add any API mocks here if needed
]

export const server = createMiddleware(...handlers)
