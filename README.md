## Getting Started

### 1. Install dependencies:

```bash
npm install
```

### 2. Create and seed the database

```bash
npx prisma migrate dev
```

### 3. Start the app

```bash
npm run dev
```

### if there is no data, run this
```bash
npx prisma seed
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## Tech

- React
- Tailwind CSS
- Typescript
- Nextjs 13
- Prisma
- Jest

## Including

- Emulating a weak network environment with chrome devtool to check
  - Lazyloading
  - ErrorBoundary and retry
  - FE optimistic updates
- Responsive design
