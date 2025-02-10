Tech Stack Review
1️⃣ Frontend Framework & Libraries
✅ React (Latest Version) – Core frontend framework.
✅ Vite (instead of CRA) – Faster dev environment.
✅ Material UI (MUI) – UI components and styling.
✅ React Router – For navigation.
✅ Redux Toolkit (or Zustand?) – State management (if needed).
✅ Axios – API calls.
✅ React Query – If we need better API caching and state management.

2️⃣ Authentication & Security
✅ Session-based auth with Redis – Since we're not using JWT.
✅ Refresh token logic – Handled in frontend based on API response.
✅ Role-Based Access Control (RBAC) – Admin vs. normal users.
✅ CSRF Protection & Secure Cookies – For API security.

3️⃣ API Communication
✅ Custom API Wrapper – Standardized Axios requests.
✅ Global Error Handling – Show user-friendly errors.
✅ Loading & Toast Notifications – Better UX.

4️⃣ Project Structure
/src
  /api        → API calls (Axios, React Query)
  /components → Reusable UI components
  /hooks      → Custom hooks
  /layouts    → App-wide layouts (e.g., dashboard)
  /pages      → Page components (e.g., Login, Dashboard)
  /store      → Global state (Redux/Zustand if needed)
  /utils      → Helper functions
  /styles     → Global styles (MUI Theme)

── src/
│   ├── api/                  # API calls & Axios wrapper
│   │   ├── authApi.js        # Authentication API (login, logout, refresh token)
│   │   ├── userApi.js        # User-related API calls
│   │   ├── axiosInstance.js  # Pre-configured Axios instance
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.js         # Navigation bar
│   │   ├── Sidebar.js        # Sidebar component
│   │   ├── ProtectedRoute.js # Route protection (RBAC)
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.js        # Hook for authentication state
│   │   ├── useFetch.js       # Hook for API fetching with caching
│   ├── layouts/              # Layout components
│   │   ├── AdminLayout.js    # Layout for admin pages
│   │   ├── UserLayout.js     # Layout for user pages
│   ├── pages/                # Main application pages
│   │   ├── Auth/
│   │   │   ├── Login.js      # Login page
│   │   │   ├── Register.js   # Registration page
│   │   ├── Dashboard/
│   │   │   ├── AdminDashboard.js  # Admin dashboard
│   │   │   ├── UserDashboard.js   # User dashboard
│   │   ├── NotFound.js       # 404 Page
│   ├── store/                # Redux state management
│   │   ├── slices/
│   │   │   ├── authSlice.js  # Authentication state
│   │   │   ├── userSlice.js  # User state
│   │   ├── store.js          # Redux store setup
│   ├── utils/                # Helper functions
│   │   ├── formatDate.js     # Utility to format dates
│   │   ├── validation.js     # Form validation helpers
│   ├── styles/               # Global styles and themes
│   │   ├── theme.js          # MUI theme configuration
│   ├── App.js                # Main React component
│   ├── index.js              # React entry point
│   ├── routes.js             # Centralized route definitions
│
├── .env                      # Environment variables (API URL, secrets)
├── package.json              # Dependencies & scripts
