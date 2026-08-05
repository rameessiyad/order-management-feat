# Real-Time Food Ordering System

A full-stack food ordering application that allows customers to browse menu items, place orders, and track their order status in real time. The application uses WebSockets (Socket.IO) to provide instant order status updates without requiring users to refresh the page.

---

# Features

* Browse available menu items
* Search menu items with debounced search
* Add and manage items in the shopping cart
* Checkout with delivery information
* Create and view orders
* Real-time order status tracking
* Automatic order status progression
* Responsive user interface
* RESTful API architecture
* Live updates using Socket.IO

---

# Tech Stack

## Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Axios
* Socket.IO Client
* Lucide React

## Backend

* NestJS
* TypeScript
* Prisma ORM
* MySQL
* Socket.IO

---

# Project Structure

```text
.
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   └── ...
│
└── backend/
    ├── src/
    │   ├── menu/
    │   ├── orders/
    │   ├── order-status/
    │   ├── prisma/
    │   └── ...
    └── prisma/
```

---

# Application Workflow

```text
Browse Menu
      │
      ▼
Search Menu
      │
      ▼
Add Items to Cart
      │
      ▼
Checkout
      │
      ▼
Create Order
      │
      ▼
Order Received
      │
      ▼
Preparing
      │
      ▼
Out for Delivery
      │
      ▼
Delivered
```

---

# REST API

## Menu

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| GET    | `/menu`     | Retrieve all menu items       |
| GET    | `/menu/:id` | Retrieve a specific menu item |
| POST   | `/menu`     | Create a new menu item        |

## Orders

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/orders`            | Create a new order        |
| GET    | `/orders`            | Retrieve all orders       |
| GET    | `/orders/:id`        | Retrieve a specific order |
| PATCH  | `/orders/:id/status` | Update an order status    |

---

# Database Models

* MenuItem
* Order
* OrderItem

---

# Order Status Flow

```text
RECEIVED
    ↓
PREPARING
    ↓
OUT_FOR_DELIVERY
    ↓
DELIVERED
```

---

# Real-Time Communication

The application uses **Socket.IO** to provide live order status updates.

### Client Events

* `subscribeToOrder`

### Server Events

* `orderStatusUpdate`

---

# Installation

## Clone the Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# Environment Variables

## Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend (`.env`)

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

---

# Running the Application

### Start Backend

```bash
npm run start:dev
```

### Start Frontend

```bash
npm run dev
```
