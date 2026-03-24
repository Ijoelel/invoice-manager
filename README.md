# 📄 Billing & Invoice Manager

A web application for managing customer invoices, built as part of a Frontend Engineer take-home test.

---

## 🚀 Live Demo

https://invoice-manager-ivory.vercel.app/

---

## 📦 Installation & Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/invoice-manager.git
cd invoice-manager
```

### 2. Install Dependencies

```bash
npm install
```

> ⚠️ If needed:

```bash
npm install --legacy-peer-deps
```

### 3. Run JSON Server (Mock API)

```bash
npx json-server --watch db.json --port 3000
```

### 4. Run Frontend

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🛠 Tech Stack

### Core

- React (Vite)
- TypeScript

### Data Fetching

- TanStack Query

### State Management

- Zustand

### Form Handling

- React Hook Form
- Zod

### Table & UI

- TanStack Table
- Tailwind CSS

### Mock API

- JSON Server

---

## 📂 Project Structure

```
src/
 ├── app/
 ├── features/
 │    ├── invoices/
 │    ├── customers/
 │    └── dashboard/
 ├── shared/
 │    ├── components/
 │    ├── hooks/
 │    └── utils/
 ├── stores/
 └── lib/
```

---

## ⚙️ Features Implemented

### Task 01 — Setup Project

- Setup React + Vite + TanStack Query
- Mock API with JSON Server
- Routing setup
- Global QueryClient config

### Task 02 — Dashboard

- Summary cards
- Chart invoice status
- Latest invoices
- Loading & error handling
- Auto refetch

### Task 03 — Invoice List

- Filter (URL query params)
- Sorting
- Pagination (keepPreviousData)
- Search
- Prefetch next page

### Task 04 — Invoice Detail

- Detail invoice + customer info
- Update status (useMutation)
- invalidateQueries
- Error & loading state
- Simulate download PDF

### Task 05 — Create Invoice

- Dynamic form
- Validation (Zod)
- Auto total calculation
- Submit via mutation
- Redirect after success

### Task 06 — Global Store

- Zustand store
- Persist to localStorage
- Draft auto-save

### Task 07 — Customer Profile (Bonus)

- Parallel queries
- Total spent calculation
- Invoice list per customer

---

## 🧠 Architectural Decisions

### TanStack Query for Server State

Handles all server data (invoice, customer)

### Zustand for Client State

Handles UI state & draft persistence

### React Hook Form + Zod

Efficient form handling & validation

### Separation of Concerns

- Server state → TanStack Query
- Client state → Zustand
- Form state → React Hook Form

---

## ⚡ Most Challenging Part

### Form Draft Persistence

Syncing React Hook Form with Zustand without causing performance issues or infinite loops.

### Query Param Management

Keeping filter, sort, pagination synced with URL.

### Cache Invalidation

Ensuring UI updates after mutations.

### Pagination UX

Using keepPreviousData & prefetching.

---

## 🧪 Additional Improvements

- Debounced search
- Skeleton loading
- Error boundary
- Toast notifications

---

## 🏁 Conclusion

This project focuses on:

- Clean architecture
- Separation of concerns
- Efficient server state management
- Scalable structure
