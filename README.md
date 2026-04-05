# Product Inventory Management System

A full-stack product inventory management system built with Next.js, Node.js, Express, and PostgreSQL.

---

## Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| Frontend     | Next.js 15 (App Router), React 18, JavaScript |
| Styling      | Tailwind CSS                                  |
| State / API  | Redux Toolkit + RTK Query                     |
| Backend      | Node.js, Express.js                           |
| ORM          | Prisma                                        |
| Database     | PostgreSQL                                    |
| Validation   | Joi                                           |

---

## Project Structure

```
Product/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── validate.js
│   │   ├── repositories/
│   │   │   └── productRepository.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── productRoutes.js
│   │   ├── services/
│   │   │   └── productService.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── layout.jsx
    │   ├── page.jsx
    │   ├── providers.jsx
    │   ├── globals.css
    │   └── products/
    │       └── page.jsx
    ├── components/
    │   ├── ProductsPageClient.jsx
    │   ├── ProductTable.jsx
    │   ├── ProductForm.jsx
    │   ├── SearchBar.jsx
    │   └── TableSkeleton.jsx
    ├── store/
    │   ├── store.js
    │   ├── apiSlice.js
    │   └── productSlice.js
    ├── hooks/
    │   └── useDebounce.js
    ├── jsconfig.json
    ├── .env.local.example
    └── package.json
```

---

## Setup Instructions

### Prerequisites

- Node.js v18+
- PostgreSQL running locally (or a hosted instance)

---

### Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 3. Generate Prisma client & push schema to DB
npm run prisma:generate
npm run prisma:migrate

# 4. Start development server
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit NEXT_PUBLIC_API_URL if backend is on a different host

# 3. Start development server
npm run dev
```

The UI will be available at `http://localhost:3000`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                                | Default                 |
|----------------|--------------------------------------------|-------------------------|
| `PORT`         | Server port                                | `5000`                  |
| `NODE_ENV`     | `development` / `production`               | `development`           |
| `DATABASE_URL` | PostgreSQL connection string               | —                       |
| `CORS_ORIGIN`  | Allowed CORS origin                        | `http://localhost:3000` |

### Frontend (`frontend/.env.local`)

| Variable              | Description          | Default               |
|-----------------------|----------------------|-----------------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000` |

---

## Database Schema

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  category    String
  price       Decimal  @db.Decimal(10, 2)
  quantity    Int      @default(0)
  description String?
  created_at  DateTime @default(now())
}
```

---

## API Documentation

### Base URL: `http://localhost:5000/api`

| Method   | Endpoint            | Description              |
|----------|---------------------|--------------------------|
| `GET`    | `/products`         | Get all products         |
| `GET`    | `/products/:id`     | Get a single product     |
| `POST`   | `/products`         | Create a product         |
| `PUT`    | `/products/:id`     | Update a product         |
| `DELETE` | `/products/:id`     | Delete a product         |




## Features

- Add, view, edit and delete products
- Search by product name (debounced)
- Filter by category (dropdown)
- Optimistic UI updates on edit
- Loading skeleton while fetching
- Responsive — table on desktop, cards on mobile
- Form validation on both frontend and backend
