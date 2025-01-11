"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/configs/firebase.config";
import { setCookie, deleteCookie } from 'cookies-next';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        router.push(`/dashboard/${user.uid}`);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const token = await response.user.getIdToken();
     setCookie('firebase_token', token, {
        maxAge: 60 * 60,
        sameSite: 'lax',
      });
    } catch (error) {
      alert("Failed to sign in with Google");
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await response.user.getIdToken();
     setCookie('firebase_token', token, {
        maxAge: 60 * 60,
        sameSite: 'lax',
      });
    } catch (error) {
      alert("Failed to sign in with email and password");
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Failed to register with email and password");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      deleteCookie('firebase_token');
      router.push("/");
    } catch (error) {
      alert("Failed to sign out");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      router.push("/auth");
    } catch (error) {
      alert("Failed to send password reset email");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
