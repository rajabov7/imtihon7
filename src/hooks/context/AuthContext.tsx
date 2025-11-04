import { createContext, useState, ReactNode, useContext } from "react";
import api from "../../api/axios";

// User type
interface User {
  id: number;
  name: string;
  email: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ DEFAULT VALUE (TypeScript uchun shart)
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook (eng to'g'ri yondashuv)
export const useAuth = () => useContext(AuthContext);
