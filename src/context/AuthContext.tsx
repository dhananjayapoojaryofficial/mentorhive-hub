import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "learner" | "teacher" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  approvalStatus?: "pending" | "approved" | "rejected"; // for teachers
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: AuthUser[] = [
  { id: "1", name: "Alex Learner", email: "learner@demo.com", role: "learner", avatar: "" },
  { id: "2", name: "Sarah Chen", email: "teacher@demo.com", role: "teacher", approvalStatus: "approved", avatar: "" },
  { id: "3", name: "Admin User", email: "admin@demo.com", role: "admin", avatar: "" },
  { id: "4", name: "Marcus Johnson", email: "teacher2@demo.com", role: "teacher", approvalStatus: "pending", avatar: "" },
  { id: "5", name: "Priya Sharma", email: "learner2@demo.com", role: "learner", avatar: "" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mentorhive_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("mentorhive_user");
      }
    }
  }, []);

  const login = async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: "No account found with this email." };
    setUser(found);
    localStorage.setItem("mentorhive_user", JSON.stringify(found));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mentorhive_user");
  };

  const register = async (
    name: string,
    email: string,
    _password: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, error: "An account with this email already exists." };

    const newUser: AuthUser = {
      id: String(Date.now()),
      name,
      email,
      role,
      approvalStatus: role === "teacher" ? "pending" : undefined,
    };
    MOCK_USERS.push(newUser);
    setUser(newUser);
    localStorage.setItem("mentorhive_user", JSON.stringify(newUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
