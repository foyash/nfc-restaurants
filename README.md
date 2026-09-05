# NFC Restaurants

Modern marketing site for **NFC Restaurants** — contactless NFC & QR products for restaurants (menus, reviews, websites) with a live product configurator.

Built with **Vite + React + Framer Motion + Lenis**.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploy to Render

This repo includes a `render.yaml` blueprint.

1. Push this repo to GitHub.
2. In [Render](https://dashboard.render.com) → **New +** → **Blueprint** → select this repo → **Apply**.
   (Or **New +** → **Static Site**, build command `npm install && npm run build`, publish directory `dist`.)
3. Render builds and serves it on a `*.onrender.com` URL. Add a custom domain in the service settings.
