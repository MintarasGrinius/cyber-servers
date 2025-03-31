// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import DashboardLayout from "./components/dashboard-layout";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import ServersPage from "./pages/servers";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <DashboardLayout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/servers" element={<ServersPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </DashboardLayout>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
