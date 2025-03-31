// src/context/AuthContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { redirect, useNavigate } from "react-router-dom";

interface AuthContextType {
  loggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      navigate("/servers");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    navigate("/servers");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    redirect("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
