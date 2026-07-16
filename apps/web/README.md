# `@mabna/web`

The frontend application for Mabna, a practice financial asset browser inspired
by Rahavard365 and based on a frontend code challenge.

This package is part of the Mabna pnpm workspace. Repository-wide setup,
product context, and the broader roadmap are documented in the root README;
this document focuses on developing the web application.

## Status

The application is currently scaffolded with the default Next.js page. Product
features and the planned frontend infrastructure have not been implemented yet.

The initial frontend scope includes:

- A responsive asset list showing symbol, company name, and latest price
- Client-side search by symbol and company name
- Virtualized rendering for the large asset collection
- An asset details view showing symbol information and the latest trade
- A bid/ask view ordered by rank

## Technology

### Current

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- ESLint with the Next.js Core Web Vitals and TypeScript configurations
- Prettier integration and staged-file validation

### Planned

- SCSS Modules for component-scoped styling
- TanStack Query for server-state ownership and caching
- Server-side query prefetching with dehydration and client hydration where it
  improves the initial experience
- A production virtualization library for the asset list

Zustand is intentionally not part of the initial architecture. It will be added
only if shared client-only state emerges that cannot be owned cleanly by a
component or the URL.

## State ownership

Different kinds of state have different owners:

```text
Remote API data       -> TanStack Query
Local interaction     -> React component state
Navigation and search -> URL search parameters
Shared client state   -> Zustand, only when justified
```

This distinction keeps server data out of a general-purpose client store and
makes navigable state shareable, restorable, and compatible with browser
history.

## Rendering and data flow

The intended initial data flow is:

```text
Next.js Server Component
        |
        | prefetch query
        v
TanStack Query cache
        |
        | dehydrate
        v
HydrationBoundary
        |
        | hydrate
        v
Client Component using the same query
```

Server Components will remain the default. A component will become a Client
Component only when it needs browser APIs, event handlers, local interactive
state, or a client-only library.

The initial backend returns all assets in one response, so search and filtering
will begin on the client. A later phase will move those operations to API
endpoints and make the relevant query state URL-driven.

## Development

Install dependencies once from the repository root:

```bash
pnpm install
```

Start only the web application from the repository root:

```bash
pnpm --filter @mabna/web dev
```

Alternatively, from this directory:

```bash
pnpm dev
```

The development server is available at `http://localhost:3000` by default.
The mock API runs separately at `http://localhost:3001`.

To run both applications together, use the root command:

```bash
pnpm dev
```

## Scripts

Run package scripts from the repository root with:

```bash
pnpm --filter @mabna/web <script>
```

| Script        | Purpose                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `dev`         | Start the Next.js development server                                   |
| `build`       | Create a production build                                              |
| `start`       | Serve an existing production build                                     |
| `lint`        | Run ESLint across the web package                                      |
| `check-types` | Generate Next.js route types and run TypeScript without emitting files |

Examples:

```bash
pnpm --filter @mabna/web lint
pnpm --filter @mabna/web check-types
pnpm --filter @mabna/web build
```

Repository-level commands use Turborepo and should be preferred when validating
all affected workspaces together.

## Current structure

```text
apps/web/
├── public/              # Static assets
├── src/
│   └── app/
│       ├── globals.css  # Temporary global styles from the scaffold
│       ├── layout.tsx   # Root App Router layout
│       └── page.tsx     # Current root page
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

The structure will evolve with the product. New folders and abstractions should
represent demonstrated responsibilities rather than anticipated future needs.

## Styling direction

SCSS Modules will provide the default component styling boundary. Global styles
should be limited to application-wide concerns such as resets, typography,
design tokens, and document-level defaults.

Component styles should live beside the component they describe. Repeated
visual decisions should first be expressed as shared tokens or primitives,
rather than copied values or a prematurely broad component library.

## Virtualization goal

The production asset list will use a maintained virtualization library, but the
project also serves as a place to understand the mechanism rather than treat it
as a black box:

- Calculate the visible item range from scroll position and viewport size
- Render only that range plus overscan
- Preserve the full list's virtual scroll height
- Position rendered rows within that virtual space
- Keep row identity and measurement stable

Performance decisions should be validated with measurements. The list being
large justifies virtualization; unrelated memoization should still be driven by
evidence.

## Quality expectations

Frontend work should preserve these expectations:

- Responsive behaviour is designed with the component, not added afterward
- Interactive elements are keyboard accessible and have visible focus states
- Loading, empty, error, and success states are intentionally represented
- Financial values are formatted consistently and retain their meaning across
  screen sizes
- Server and Client Component boundaries remain explicit
- New state-management dependencies solve a concrete ownership problem
- Transformation and sorting logic remains independently testable

## Planned implementation sequence

1. Establish the visual language and responsive page shell.
2. Define API response types and the frontend API boundary.
3. Configure TanStack Query and the server-to-client hydration path.
4. Implement the asset list and client-side search.
5. Add list virtualization and measure its behaviour.
6. Implement asset details, latest trade data, and ranked bid/ask entries.
7. Add focused tests for data transformation and critical user flows.
8. Adapt the frontend to server-side search, sorting, filtering, and pagination
   when those API capabilities are introduced.
