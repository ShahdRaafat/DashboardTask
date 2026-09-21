# Orders Dashboard

A responsive admin dashboard for managing and visualizing order data, built with Next.js, Redux Toolkit, and Tailwind CSS.

## Tech Stack

| Concern          | Choice                                                                     |
| ---------------- | -------------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, TypeScript)                                        |
| Styling          | Tailwind CSS v4                                                            |
| State management | Redux Toolkit                                                              |
| Auth             | Mocked auth via Next.js Route Handlers (JWT + bcrypt, no external service) |
| Charts           | Recharts (area, pie, bar — all animated and responsive)                    |
| Export           | jsPDF + jspdf-autotable (PDF), SheetJS/xlsx (Excel)                        |
| Containerization | Docker (multi-stage build)                                                 |

## Getting Started

```bash
git clone https://github.com/ShahdRaafat/DashboardTask.git
cd dashboard-task
npm install
```

Create a `.env.local` file in the project root:

```
JWT_SECRET=your-own-random-secret-string
```

Then run:

```bash
npm run dev
```

App runs at `http://localhost:3000`. You'll be redirected to `/login` automatically if you're not authenticated.

### Test credentials

| Email             | Password    |
| ----------------- | ----------- |
| shahd@example.com | password123 |
| admin@example.com | admin456    |
| test@example.com  | test789     |

## Running with Docker

```bash
docker build -t orders-dashboard .
docker run -p 3000:3000 -e JWT_SECRET=your-secret-here orders-dashboard
```

`JWT_SECRET` is intentionally **not** baked into the image (see `.dockerignore`, which excludes `.env*`). It's passed at container runtime instead, so the same image can be reused across environments without rebuilding, and the secret never ends up inside the built image layers.

## Implementation Approach

### Auth

Authentication is mocked entirely through Next.js Route Handlers. `/api/auth/login` checks credentials against `data/users.json` (passwords hashed with bcrypt, never stored or compared in plaintext), and on success signs a JWT stored in an `httpOnly` cookie. Route protection is handled in `src/proxy.ts`, which only checks for the cookie's presence — actual JWT verification happens in Route Handlers, which run on the Node.js runtime.

Because Redux state resets on every page load/refresh, `/api/auth/me` re-verifies the existing cookie and restores the logged-in user into Redux on dashboard mount, via a small client component (`AuthLoader`) — this keeps the dashboard layout itself a server component.

### Why Redux for table state (not URL search params)

Table state (search term, status filter, sort field/direction, current page) is managed in Redux via `orderSlice`, rather than URL search params.

In a production app, URL search params would likely be the better choice — they produce shareable links and survive a page refresh without extra code. However, this task explicitly requires Redux Toolkit for state management, so this state was intentionally kept in Redux, applied to the app's core feature (the data table) rather than auth alone, to demonstrate real usage of it.

### Data table

Built by hand rather than with a table library (e.g. TanStack Table), to keep the sorting/filtering/pagination logic fully understood and explainable rather than delegated to a dependency. Filtering, searching, sorting, and pagination are each separate pure functions in `lib/OrderOperations.ts`, composed together in `getFinalOrders` — Redux only stores the _criteria_, not the computed result.

On screens narrower than `lg` (1024px), the table is replaced with a stacked card layout (`OrderCard`) showing the same data, rather than forcing horizontal scroll on a 6-column table.

### Known limitations

- `xlsx` currently has a known moderate/high severity advisory upstream; usage here is limited to generating export files from local app data (not parsing untrusted uploads), which limits real-world exposure.
