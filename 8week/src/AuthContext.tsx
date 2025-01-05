import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);
