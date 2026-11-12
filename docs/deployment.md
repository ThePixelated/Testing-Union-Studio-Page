# Deployment — GitHub Pages

## One-time GitHub configuration

1. Push the project to the `main` branch.
2. Open repository Settings → Pages.
3. Under Build and deployment, select **GitHub Actions**.

## Workflow

A push to `main` triggers the workflow:
1. Checkout repository
2. Install Node.js
3. Run `npm ci`
4. Run `npm run build`
5. Upload `dist/`
6. Deploy to GitHub Pages

## Repository path

Current repository: `ThePixelated/Testing-Union-Studio-Page`

Current Vite base path:
`/Testing-Union-Studio-Page/`

If repository name changes, update `base` in `vite.config.ts`.

If deploying to a custom domain root or Cloudflare Pages, set `base: '/'`.
