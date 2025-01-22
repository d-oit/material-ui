import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.VITE_POCKETBASE_URL}/api/collections/links/records`, (req, res, ctx) => {
    return res(
      ctx.json({ items: [{ id: '1', url: 'https://example.com', title: 'Test Link' }] })
    );
  }),
];
