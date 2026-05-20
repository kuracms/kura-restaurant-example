# kura-restaurant-example

An example [Next.js](https://nextjs.org) site reading from a [kura](https://kuracms.com) content backend. Live at `restaurant.kuracms.com`.

A small Tokyo izakaya: two content types (menu sections and dishes), photos via Unsplash, prices in yen. Built to show what kura looks like behind a React + Tailwind frontend rather than the Astro one at `property.kuracms.com`.

## How it works

`src/lib/kura.ts` is a small typed REST client. Two endpoints:

- `GET /api/v1/restaurant/menu_section?limit=50`
- `GET /api/v1/restaurant/menu_item?limit=100`

`Authorization: Bearer <token>` on every request. The token is project-scoped and read-only.

App Router server components fetch with `{ next: { revalidate: 60 } }`, so edits in the kura admin propagate within a minute without a redeploy.

## Run locally

```
KURA_TOKEN=<your-token> npm run dev
```

## Deploy

Built with [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) and deployed to Cloudflare Workers.

```
npm run deploy
```

