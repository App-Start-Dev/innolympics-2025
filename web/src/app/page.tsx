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
        <div className="h-svh flex flex-col items-center justify-center">
            {userAccount ? (
                <button onClick={logout}>Sign Out</button>
            ) : (
                <button onClick={loginWithGoogle}>Sign In</button>
            )}
        </div>
    );
}
