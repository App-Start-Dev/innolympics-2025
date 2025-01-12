'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/auth.provider';
import { User } from 'firebase/auth';

export default function Home() {
    const [userAccount, setUserAccount] = useState<User | null>(null);
    const { user, logout, loginWithGoogle } = useAuth();

    useEffect(() => {
        setUserAccount(user);
    }, [user]);

    return (
        <div className="h-svh flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-2">
                <img src="logo.svg" alt="Logo" className="w-32 h-32" />
                <p className="text-4xl font-semibold">
                    Agap<span className="text-primary">AI</span>
                </p>
            </div>
            {userAccount ? (
                <button
                    className="bg-primary text-white px-24 py-3 rounded text-lg "
                    onClick={logout}
                >
                    Sign Out
                </button>
            ) : (
                <button
                    onClick={loginWithGoogle}
                    className="bg-primary text-white px-24 py-3 rounded text-lg "
                >
                    Sign In
                </button>
            )}
        </div>
    );
}
