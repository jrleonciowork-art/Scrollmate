# Scrollmate

Premium, responsive agency website for Scrollmate — social media management focused on content, community, and growth.

## Local development

Requirements: Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
pnpm lint
pnpm build
```

## Deploy to Vercel

1. Import the GitHub repository in the Vercel dashboard.
2. Keep the detected framework preset as **Next.js**.
3. Keep the project root as `./`.
4. Deploy. No environment variables are required.

Vercel will automatically build new commits pushed to the production branch.
