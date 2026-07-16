# Mabna

Mabna is a practice implementation of a financial asset browser inspired by
Rahavard365 and based on a frontend code challenge.

The goal of this project is not only to complete the challenge. It is a place
to practise senior-level frontend engineering decisions: choosing appropriate
boundaries, understanding trade-offs, avoiding premature abstractions, and
evolving a small application without losing clarity.

## Project status

The repository is currently in its scaffolding phase. The monorepo, frontend
application, mock API, task orchestration, formatting, linting, and type-checking
foundations are in place. Product features have not been implemented yet.

## Product scope

The initial application will contain two responsive pages:

- An asset list displaying each asset's symbol, company name, and latest price
- An asset details page displaying symbol information, latest trade data, and a
  bid/ask list ordered by rank

The initial API returns the complete data set, so search and filtering will
begin on the client. A later phase will extend the API with server-side search,
sorting, filtering, and pagination, then adapt the frontend data flow to match.

## Repository structure

```text
mabna/
├── apps/
│   ├── api/       # Express mock HTTP API (@mabna/api)
│   └── web/       # Next.js frontend (@mabna/web)
├── packages/      # Future shared packages
├── package.json   # Repository-level scripts and toolchain constraints
├── pnpm-workspace.yaml
└── turbo.json     # Monorepo task graph and cache configuration
```

## Technology

### Current foundation

- pnpm workspaces for dependency and workspace management
- Turborepo for dependency-aware task orchestration and caching
- Node.js 24
- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- Express for the supplied mock API
- ESLint and Prettier for static analysis and formatting

### Planned frontend architecture

- SCSS Modules for locally scoped component styling
- TanStack Query for server state
- Server Component prefetching with query dehydration and client hydration where
  it provides a meaningful initial-render benefit
- Local component state for local UI concerns
- URL search parameters for shareable navigation, filtering, and sorting state
- Zustand only if genuine shared client-only state appears
- List virtualization for rendering large asset collections efficiently

State ownership will be chosen by responsibility rather than placed in a global
store by default:

```text
Server state          -> TanStack Query
Local UI state        -> React state
Shareable route state -> URL search parameters
Global client state   -> Zustand, only when justified
```

## Getting started

### Prerequisites

- Node.js `>=24 <25`
- pnpm `11.13.1`

The repository declares its package manager version in the root
`package.json`. If you use Corepack, enable it before installing dependencies:

```bash
corepack enable
corepack prepare pnpm@11.13.1 --activate
```

### Installation

From the repository root:

```bash
pnpm install
```

### Development

Start all applications through Turborepo:

```bash
pnpm dev
```

By default:

- The web application runs at `http://localhost:3000`
- The API runs at `http://localhost:3001`

Run one application in isolation when needed:

```bash
pnpm --filter @mabna/web dev
pnpm --filter @mabna/api dev
```

## Repository commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run development tasks in watch mode |
| `pnpm build` | Build workspace packages and applications |
| `pnpm lint` | Run configured lint tasks |
| `pnpm check-types` | Generate Next.js route types and run TypeScript checks |
| `pnpm test` | Run workspace test tasks once they are introduced |
| `pnpm format` | Format the repository with Prettier |
| `pnpm format:check` | Check formatting without changing files |

Turborepo runs only tasks that exist in each workspace and uses the dependency
graph to order dependent work. Development tasks are persistent and deliberately
uncached; deterministic tasks such as builds and type checks can reuse cached
results.

## Mock API

The current API reads the challenge's local JSON fixtures and exposes:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/assets` | Return all assets |
| `GET` | `/assets/:id` | Return the asset matching an ID |
| `GET` | `/trades` | Return all trades |
| `GET` | `/trades?asset_id=:id` | Return trades for one asset |
| `GET` | `/bidasks` | Return all bid/ask entries |
| `GET` | `/bidasks?asset_id=:id` | Return bid/ask entries for one asset |

## Architectural principles

- Solve demonstrated problems instead of introducing abstractions in advance.
- Keep server state, URL state, and client state conceptually separate.
- Prefer clear feature and application boundaries over convenience-based
  organization.
- Make responsive behaviour and accessibility part of component design, not a
  final pass.
- Measure before optimizing, while deliberately learning the mechanics behind
  important techniques such as virtualization.
- Keep the original challenge as product context, not as a restriction on
  thoughtful architectural improvement.

## Planned evolution

1. Define the frontend folder structure, component boundaries, and visual
   language.
2. Establish the API client and TanStack Query infrastructure.
3. Build the responsive asset list with client-side search and virtualization.
4. Build the asset details experience and ranked bid/ask view.
5. Add focused automated tests around transformation logic and critical user
   flows.
6. Extend the API with search, sorting, filtering, and pagination.
7. Move relevant list state into the URL and explore query caching, database
   indexing, and pagination strategies.

## Learning topics

This project intentionally creates room to explore:

- Server and Client Component boundaries in the Next.js App Router
- SSR prefetching, dehydration, hydration, and query-cache ownership
- Virtualization internals: visible ranges, virtual height, positioning, and
  overscan
- Rendering performance and evidence-based optimization
- Accessible financial-data presentation across screen sizes
- API design, filtering, sorting, pagination, and database indexing
