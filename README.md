# Notes App — Frontend

React frontend for the Notes App with authentication, CRUD, search, filtering, dark mode, and a modern Bootstrap UI.

## Tech Stack

- React 19
- Redux Toolkit
- React Router
- TanStack Query
- Axios
- React Hook Form + Zod
- React Bootstrap + Bootstrap Icons

## Prerequisites

- Node.js v18+
- The backend server running (see backend repo)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment

No `.env` file needed. The API base URL is set in `src/api/axios.js`:

```js
baseURL: "http://localhost:5000"
```

Change it if your backend runs on a different port.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |

## Project Structure

```
src/
├── api/              # Axios instance & API functions
│   ├── axios.js      # Axios instance with auth interceptor
│   ├── auth.js       # Login, register, upload image
│   └── notes.js      # CRUD for notes
├── components/       # Reusable components
│   ├── AppNavbar.jsx
│   ├── ConfirmDeleteModal.jsx
│   ├── DashboardHeader.jsx
│   ├── EmptyState.jsx
│   ├── ErrorAlert.jsx
│   ├── Footer.jsx
│   ├── FormInput.jsx
│   ├── Layout.jsx
│   ├── LoadingSpinner.jsx
│   ├── NoteCard.jsx
│   ├── ThemeToggle.jsx
│   └── UserAvatar.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── NotesList.jsx
│   ├── CreateNote.jsx
│   ├── EditNote.jsx
│   ├── NoteDetails.jsx
│   └── Profile.jsx
├── redux/            # State management
│   ├── store.js
│   ├── authSlice.js
│   └── themeSlice.js
├── routes/
│   └── ProtectedRoute.jsx
├── App.jsx           # Routes & providers
├── App.css           # Global styles & theme
└── main.jsx          # Entry point
```

## Features

- Login & Register with JWT
- Protected routes
- Notes CRUD with optimistic updates
- Search, filter by category/status, sort, pagination
- Profile image upload
- Dark / Light theme toggle
- Responsive Bootstrap UI with gradients and glassmorphism
- Debounced search (500ms)
- Unit tests (Jest + React Testing Library)
