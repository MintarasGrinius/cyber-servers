// src/context/AuthContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  loggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    } else {
      localStorage.setItem("token", token);

      if (window.location.pathname === "/login") {
        navigate("/dashboard");
      }
    }
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
