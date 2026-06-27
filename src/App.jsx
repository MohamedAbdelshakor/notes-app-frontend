import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotesList from "./pages/NotesList";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetails from "./pages/NoteDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

function AppRoutes() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes/create"
        element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <ProtectedRoute>
            <NoteDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes/:id/edit"
        element={
          <ProtectedRoute>
            <EditNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={`app ${theme}`}>
          <Layout>
            <AppRoutes />
          </Layout>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
