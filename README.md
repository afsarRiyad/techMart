<div align="center">

# ⚡ TechMart

**A modern, full-featured e-commerce frontend built with React**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About

TechMart is a responsive e-commerce frontend application designed for electronics and gadget shopping. It features a clean, modern UI with dark mode support, advanced product filtering, and a smooth user experience across all devices.

The application connects to a REST API backend for product data, user authentication, and order management.

---

## ✨ Features

### 🏠 Home Page
- Hero slider with promotional banners
- Top categories showcase
- Featured & trending products
- Best sellers & recommendations
- Promotional category sections
- Value propositions bar

### 🛍️ Product Catalog
- **4 view modes:** Columns, Grid, List, Compact List
- Advanced filtering by brands, colors, and price range
- Sort by price, rating, latest, and default
- Pagination with page navigation
- URL-synced filters (shareable/bookmarkable)
- Active filter chips with one-click removal
- Responsive sidebar with mobile slide-in drawer

### 🛒 Shopping Experience
- Product detail pages with images and ratings
- Shopping cart management
- Wishlist functionality
- Checkout flow (Billing → Shipping → Order confirmation)

### 👤 User Features
- User registration & login
- OTP verification
- Password reset flow
- Protected routes for authenticated users
- User account dashboard
- Order tracking

### 🎨 UI/UX
- Fully responsive (mobile, tablet, desktop)
- Dark mode support
- Skeleton loading states
- Toast notifications
- Smooth transitions & animations

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Redux Toolkit + React Redux |
| **Server State** | TanStack React Query |
| **Routing** | React Router 7 |
| **HTTP Client** | Axios |
| **Icons** | Lucide React + React Icons |
| **Carousel** | Swiper |
| **Notifications** | React Hot Toast |
| **SVG** | vite-plugin-svgr |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/techmart.git

# Navigate to the project directory
cd techmart

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=your_backend_api_url
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── api/                  # Axios instance & API configuration
├── app/                  # Redux store setup
├── assets/               # Images, icons, and static files
├── components/
│   ├── common/           # Shared components (ErrorBoundary)
│   ├── dashboard/        # User dashboard components
│   ├── footer/           # Footer layout
│   ├── header/           # Navbar, Searchbar, Topbar
│   ├── home/             # Home page sections (Hero, Categories, Deals, etc.)
│   ├── layout/           # Container and layout wrappers
│   ├── product/          # Product cards, sidebar, grids, lists, skeletons
│   └── ui/               # Reusable UI primitives (Dropdown, etc.)
├── data/                 # Static data / constants
├── features/
│   ├── cart/             # Cart Redux slice & thunks
│   ├── counter/          # Counter slice (demo)
│   ├── product/          # Product page state, hooks, API calls
│   ├── user/             # User auth state & API calls
│   └── wishlist/         # Wishlist Redux slice & thunks
├── hooks/                # Custom React hooks (useSyncFiltersToUrl)
├── pages/                # Route-level page components
├── routes/               # Route guards (ProtectedRoute)
├── App.jsx               # Root component with routing
├── main.jsx              # Entry point
└── index.css             # Global styles & Tailwind imports
```

---

## 🔧 Key Implementation Details

### URL-Synced Filters
Product filters (brands, colors, price, sort, page) are bidirectionally synced with URL search params, making filtered pages shareable and bookmarkable.

### Mobile-First Responsive Design
- **Desktop:** Persistent sidebar with category tree and filter panel
- **Mobile:** Slide-in drawer with backdrop overlay and body scroll lock

### State Architecture
- **Redux Toolkit** for global UI state (filters, cart, wishlist, user)
- **React Query** for server state (products, categories, API data)
- **Local state** for component-specific concerns (sidebar toggle, input values)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using React + Vite + Tailwind CSS**

</div>
